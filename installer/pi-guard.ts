import fs from "node:fs";
import path from "node:path";

type Rule = {
  id: string;
  match: string;
  matchType?: "regex" | "exact" | "prefix";
  reason?: string;
  confirmation?: "none" | "confirm" | "type-phrase";
};

function loadManifest() {
  const file = process.env.PISOLATE_MANIFEST;
  if (!file) throw new Error("PISOLATE_MANIFEST is not set");
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function hasShellMetacharacters(command: string) {
  return /[;&|`$<>]/.test(command);
}

function matches(rule: Rule, command: string) {
  if ((rule.matchType || "regex") === "exact") return command === rule.match;
  if (rule.matchType === "prefix") return command === rule.match || command.startsWith(`${rule.match} `);
  return new RegExp(rule.match).test(command);
}

function evaluateCommand(command: string) {
  const manifest = loadManifest();
  if (command.includes("\n") || command.includes("\r")) return { allowed: false, reason: "multiline commands are denied" };
  if (manifest.commandPolicy?.shell?.denyShellMetacharacters !== false && hasShellMetacharacters(command)) {
    return { allowed: false, reason: "shell metacharacters are denied" };
  }
  for (const rule of manifest.commandPolicy?.denied || []) {
    if (matches(rule, command)) return { allowed: false, reason: rule.reason || rule.id || "denied rule" };
  }
  for (const rule of manifest.commandPolicy?.allowed || []) {
    if (matches(rule, command)) return { allowed: true, reason: rule.id || "allowed rule" };
  }
  return { allowed: manifest.commandPolicy?.default === "allow", reason: "default policy" };
}

function expandHome(value: string) {
  if (value === "~") return process.env.HOME || value;
  if (value.startsWith("~/")) return `${process.env.HOME || "~"}/${value.slice(2)}`;
  return value;
}

function evaluatePath(operation: "read" | "edit" | "write", targetPath: string) {
  const manifest = loadManifest();
  const cwd = process.env.PISOLATE_WORKING_ROOT || process.cwd();
  const resolved = path.resolve(cwd, expandHome(targetPath));
  const rel = path.relative(cwd, resolved);
  if (!rel || rel.startsWith("..") || path.isAbsolute(rel) || rel.includes("..")) {
    return { allowed: false, reason: "path outside working root" };
  }
  const policy = manifest.pathPolicy || {};
  const exact = (candidate: string) => path.normalize(candidate) === rel;
  const inList = (items: any[] = []) => items.some((item) => exact(typeof item === "string" ? item : item.path));
  const denyList = [...(policy.generatedReadOnly || []), ...(policy.legacyReadOnly || []), ...(policy.sensitiveDenied || [])];

  if (operation === "edit" || operation === "write") {
    if (denyList.some((item) => rel === item || rel.startsWith(`${item}/`))) return { allowed: false, reason: "path is read-only or sensitive" };
    const editable = (policy.editable || []).find((item: any) => exact(item.path));
    if (!editable && policy.default === "allow") return { allowed: true, reason: "default path policy" };
    if (!editable) return { allowed: false, reason: "path is not editable by this pisolate" };
    if (editable.mustExist && !fs.existsSync(resolved)) return { allowed: false, reason: "editable path does not exist" };
    if (editable.create === false && !fs.existsSync(resolved)) return { allowed: false, reason: "creating this path is denied" };
    return { allowed: true, reason: editable.reason || "editable path" };
  }

  if (operation === "read" && (inList(policy.readable || []) || inList(policy.editable || []))) {
    return { allowed: true, reason: "readable path" };
  }

  return { allowed: policy.default === "allow", reason: "default path policy" };
}

function extractToolPath(input: any) {
  if (!input || typeof input !== "object") return "";
  return input.path || input.file_path || input.filePath || input.filename || input.file || input.target || "";
}

export default function pisolatesGuard(pi: any) {
  const block = (command: string) => {
    const result = evaluateCommand(command);
    if (!result.allowed) throw new Error(`pisolates blocked command: ${result.reason}`);
  };

  pi.on?.("tool_call", async (ctx: any) => {
    const name = ctx.toolName || ctx.name || ctx.tool?.name;
    if (name === "bash") {
      block(ctx.input?.command || ctx.args?.command || "");
    }
    if (name === "edit") {
      const targetPath = extractToolPath(ctx.input || ctx.args || {});
      const result = evaluatePath("edit", targetPath);
      if (!result.allowed) throw new Error(`pisolates blocked edit: ${result.reason}`);
    }
    if (name === "write") {
      const targetPath = extractToolPath(ctx.input || ctx.args || {});
      const result = evaluatePath("write", targetPath);
      if (!result.allowed) throw new Error(`pisolates blocked write: ${result.reason}`);
    }
  });

  pi.on?.("user_bash", async (ctx: any) => {
    block(ctx.command || ctx.input || "");
  });
}
