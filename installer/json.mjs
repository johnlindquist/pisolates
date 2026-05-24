#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const [, , cmd, ...args] = process.argv;

function die(message) {
  console.error(`pisolates: ${message}`);
  process.exit(2);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

function expandHome(value) {
  if (!value) return value;
  if (value === "~/.pisolates") return process.env.PISOLATES_HOME || path.join(process.env.HOME || "~", ".pisolates");
  if (value.startsWith("~/.pisolates/")) return path.join(process.env.PISOLATES_HOME || path.join(process.env.HOME || "~", ".pisolates"), value.slice("~/.pisolates/".length));
  if (value === "~") return process.env.HOME || value;
  if (value.startsWith("~/")) return path.join(process.env.HOME || "~", value.slice(2));
  return value;
}

function recipeManifests(root) {
  return fs
    .readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(root, entry.name, "pisolate.json"))
    .filter((file) => fs.existsSync(file));
}

function manifestCommands(manifest) {
  const lines = [];
  for (const [modeName, mode] of Object.entries(manifest.modes || {})) {
    for (const command of mode.commands || []) {
      lines.push([modeName, command]);
    }
  }
  return lines;
}

function validateManifest(file) {
  const manifest = readJson(file);
  const dir = path.dirname(file);
  const errors = [];
  const required = ["schemaVersion", "name", "version", "description", "category", "prompt", "modes", "requires", "commandPolicy", "install", "smokeChecks", "compat"];
  for (const key of required) {
    if (!(key in manifest)) errors.push(`${file}: missing ${key}`);
  }
  if (manifest.schemaVersion !== 1) errors.push(`${file}: schemaVersion must be 1`);
  if (!/^[a-z][a-z0-9-]*$/.test(manifest.name || "")) errors.push(`${file}: invalid name`);
  if (path.basename(dir) !== manifest.name) errors.push(`${file}: parent directory must match manifest name`);
  for (const rel of [manifest.prompt, manifest.readme || "README.md", manifest.oraclePlan || "oracle-plan.md"]) {
    if (rel && !fs.existsSync(path.join(dir, rel))) errors.push(`${file}: missing ${rel}`);
  }
  for (const rel of manifest.docs || []) {
    if (rel && !fs.existsSync(path.join(dir, rel))) errors.push(`${file}: missing docs file ${rel}`);
  }
  const seen = new Map();
  for (const [mode, command] of manifestCommands(manifest)) {
    if (!/^(pi|p)-[a-z][a-z0-9-]*(-[a-z0-9-]+)?$/.test(command)) errors.push(`${file}: invalid command ${command}`);
    if (seen.has(command)) errors.push(`${file}: duplicate command ${command}`);
    seen.set(command, mode);
  }
  const modeTools = Object.values(manifest.modes || {}).flatMap((mode) => mode.pi?.tools || []);
  const hasWriteTool = modeTools.includes("edit") || modeTools.includes("write");
  if (hasWriteTool) {
    if (!manifest.pathPolicy) errors.push(`${file}: edit/write tools require pathPolicy`);
  }
  for (const bucket of ["allowed", "denied"]) {
    for (const rule of manifest.commandPolicy?.[bucket] || []) {
      if (!rule.id) errors.push(`${file}: ${bucket} rule missing id`);
      if (!rule.match) errors.push(`${file}: ${bucket} rule ${rule.id || "<unknown>"} missing match`);
      if (bucket === "denied" && !rule.reason) errors.push(`${file}: denied rule ${rule.id || "<unknown>"} missing reason`);
      if (rule.match) {
        try {
          new RegExp(rule.match);
        } catch (error) {
          errors.push(`${file}: ${bucket} rule ${rule.id || "<unknown>"} invalid regex: ${error.message}`);
        }
      }
    }
  }
  return errors;
}

function allRecipeDirs(root) {
  return recipeManifests(root).map((file) => path.dirname(file));
}

function commandAllowed(manifest, command) {
  const shell = manifest.commandPolicy?.shell || {};
  if (shell.denyMultiline !== false && (command.includes("\n") || command.includes("\r"))) return { allowed: false, reason: "multiline commands are denied" };
  const denyMeta = shell.denyShellMetacharacters !== false;
  if (denyMeta && /[;&|`$<>]/.test(command)) return { allowed: false, reason: "shell metacharacters are denied" };

  const matchesRule = (rule) => {
    const type = rule.matchType || "regex";
    if (type === "exact") return command === rule.match;
    if (type === "prefix") return command === rule.match || command.startsWith(`${rule.match} `);
    return new RegExp(rule.match).test(command);
  };

  for (const rule of manifest.commandPolicy?.denied || []) {
    if (matchesRule(rule)) return { allowed: false, reason: rule.reason || rule.id || "denied rule" };
  }
  for (const rule of manifest.commandPolicy?.allowed || []) {
    if (matchesRule(rule)) return { allowed: true, reason: rule.id || "allowed rule" };
  }
  return { allowed: manifest.commandPolicy?.default === "allow", reason: "default policy" };
}

function pathPolicy(manifest, operation, targetPath, cwdArg) {
  if (!targetPath || targetPath.includes("\0")) return { allowed: false, reason: "invalid path" };
  const policy = manifest.pathPolicy || {};
  if (policy.default === "allow" && policy.allowOutsideWorkingRoot === true) return { allowed: true, reason: "default path policy" };
  const cwd = path.resolve(expandHome(cwdArg || manifest.defaultRoot || process.cwd()));
  const resolved = path.resolve(cwd, expandHome(targetPath));
  const rel = path.relative(cwd, resolved);
  if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) return { allowed: false, reason: "path outside working root" };
  if (rel.includes("..")) return { allowed: false, reason: "path traversal is denied" };

  const exact = (candidate) => path.normalize(candidate) === rel;
  const inList = (items = []) => items.some((item) => exact(typeof item === "string" ? item : item.path));
  const denyList = [...(policy.generatedReadOnly || []), ...(policy.legacyReadOnly || []), ...(policy.sensitiveDenied || [])];

  if (operation === "edit" || operation === "write") {
    if (denyList.some((item) => rel === item || rel.startsWith(`${item}/`))) return { allowed: false, reason: "path is read-only or sensitive" };
    const editable = (policy.editable || []).find((item) => exact(item.path));
    if (!editable && policy.default === "allow") return { allowed: true, reason: "default path policy" };
    if (!editable) return { allowed: false, reason: "path is not editable by this pisolate" };
    if (editable.mustExist && !fs.existsSync(resolved)) return { allowed: false, reason: "editable path does not exist" };
    if (editable.create === false && !fs.existsSync(resolved)) return { allowed: false, reason: "creating this path is denied" };
    return { allowed: true, reason: editable.reason || "editable path" };
  }

  if (operation === "read") {
    if (inList(policy.readable || []) || inList(policy.editable || [])) return { allowed: true, reason: "readable path" };
    return { allowed: policy.default === "allow", reason: "default path policy" };
  }

  return { allowed: false, reason: `unknown path operation: ${operation}` };
}

switch (cmd) {
  case "list-recipes": {
    const root = args[0] || process.cwd();
    for (const file of recipeManifests(root)) {
      const manifest = readJson(file);
      console.log(`${manifest.name}\t${manifest.category}\t${manifest.description}`);
    }
    break;
  }
  case "manifest-commands": {
    const manifest = readJson(args[0]);
    for (const [mode, command] of manifestCommands(manifest)) console.log(`${mode}\t${command}`);
    break;
  }
  case "manifest-mode": {
    const manifest = readJson(args[0]);
    const mode = manifest.modes?.[args[1]];
    if (!mode) die(`unknown mode ${args[1]}`);
    writeJson(mode);
    break;
  }
  case "policy": {
    const manifest = readJson(args[0]);
    const result = commandAllowed(manifest, args.slice(1).join(" "));
    console.log(`${result.allowed ? "allow" : "deny"}\t${result.reason}`);
    process.exit(result.allowed ? 0 : 1);
  }
  case "validate": {
    const root = args[0] || process.cwd();
    const errors = recipeManifests(root).flatMap(validateManifest);
    if (errors.length) {
      for (const error of errors) console.error(error);
      process.exit(1);
    }
    console.log(`validated ${recipeManifests(root).length} manifest(s)`);
    break;
  }
  case "path-policy": {
    const [manifestFile, operation, targetPath, cwd] = args;
    const manifest = readJson(manifestFile);
    const result = pathPolicy(manifest, operation, targetPath, cwd);
    console.log(`${result.allowed ? "allow" : "deny"}\t${result.reason}`);
    process.exit(result.allowed ? 0 : 1);
  }
  case "state-init": {
    const home = args[0];
    writeJson({ schemaVersion: 1, installedAt: new Date().toISOString(), home, source: { kind: "local", path: "", ref: "" }, installed: {} });
    break;
  }
  case "state-install": {
    const [stateFile, home, manifestFile] = args;
    const state = fs.existsSync(stateFile) ? readJson(stateFile) : { schemaVersion: 1, installed: {} };
    const manifest = readJson(manifestFile);
    const content = fs.readFileSync(manifestFile);
    state.home = home;
    state.installed ||= {};
    state.installed[manifest.name] = {
      version: manifest.version,
      installedAt: new Date().toISOString(),
      path: path.dirname(manifestFile),
      commands: manifestCommands(manifest).map(([, command]) => command),
      manifestHash: crypto.createHash("sha256").update(content).digest("hex"),
    };
    writeJson(state);
    break;
  }
  case "state-uninstall": {
    const [stateFile, name] = args;
    const state = fs.existsSync(stateFile) ? readJson(stateFile) : { schemaVersion: 1, installed: {} };
    delete state.installed?.[name];
    writeJson(state);
    break;
  }
  case "state-list": {
    const stateFile = args[0];
    if (!fs.existsSync(stateFile)) process.exit(0);
    const state = readJson(stateFile);
    for (const [name, value] of Object.entries(state.installed || {})) {
      console.log(`${name}\t${value.version}\t${(value.commands || []).join(",")}`);
    }
    break;
  }
  case "plan": {
    const [manifestFile, modeName] = args;
    const manifest = readJson(manifestFile);
    const mode = manifest.modes?.[modeName];
    if (!mode) die(`unknown mode ${modeName}`);
    writeJson({
      name: manifest.name,
      mode: modeName,
      commands: mode.commands,
      cwd: expandHome(mode.cwd || manifest.defaultRoot),
      prompt: path.join(path.dirname(manifestFile), manifest.prompt),
      docs: (manifest.docs || []).map((rel) => path.join(path.dirname(manifestFile), rel)),
      tools: mode.pi?.tools || [],
      yolo: mode.pi?.yolo === true,
      session: mode.pi?.session,
      policy: mode.policy,
      defaultRoot: manifest.defaultRoot,
      targetCli: manifest.targetCli,
      sensitivePaths: manifest.commandPolicy?.sensitivePaths || [],
      pathPolicy: manifest.pathPolicy,
      env: manifest.env || {},
    });
    break;
  }
  case "summary-policy": {
    const manifest = readJson(args[0]);
    console.log(`Default policy: ${manifest.commandPolicy.default}`);
    console.log("Allowed:");
    for (const rule of manifest.commandPolicy.allowed || []) console.log(`- ${rule.id}: ${rule.match}`);
    console.log("Denied:");
    for (const rule of manifest.commandPolicy.denied || []) console.log(`- ${rule.id}: ${rule.match}${rule.reason ? ` - ${rule.reason}` : ""}`);
    break;
  }
  default:
    die(`unknown json command: ${cmd || ""}`);
}
