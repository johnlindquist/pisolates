# Pisolates Manifesto

Pisolates are focused Pi launchers for one tool, one workflow, or one trust boundary.

They are not miniature agent workspaces. They are not places to inherit every global skill, extension, hook, prompt, context file, and habit the user's main agent environment has accumulated. A pisolate starts with a narrow job and only the context needed to do that job.

## The Mindset

Start clean. Load nothing ambient.

Reuse identity. Do not make the user log in again just because the harness is isolated.

Teach the tool up front. The agent should know the target CLI's common commands at startup instead of spending the user's first turn rediscovering help text.

Keep the model useful. Default to the Copilot-backed `openai-codex/gpt-5.5` model unless a future recipe has a stronger reason not to.

Prefer full capability inside the lane. A pisolate is useful because it can act decisively with its target CLI, not because it is timid by default.

Keep the lane explicit. Working directory, session directory, recipe prompt, loaded docs, target commands, and policy summaries should be inspectable without invoking the model.

Carry caller context intentionally. If the user launches a pisolate from a project directory, preserve that path as data for the recipe. Do not rely on cwd after the launcher moves into its isolated work root.

## The Boundary

A pisolate reuses the user's normal Pi login and provider configuration.

A pisolate disables ambient resource discovery:

- No discovered extensions.
- No discovered extension hooks.
- No discovered skills.
- No discovered prompt templates.
- No discovered themes.
- No cwd `AGENTS.md` or `CLAUDE.md` context files.

A pisolate only loads what its recipe config names:

- Recipe prompt.
- Recipe CLI documentation.
- Generated policy summary.
- Explicit recipe extension, only for recipes that opt into one.

## The Contract

Every `pi-*` command should answer these questions plainly:

- What recipe am I running?
- What model/provider am I using?
- What directory did the user launch me from?
- What isolated work root am I using now?
- What prompt and documentation did I load?
- What ambient resources did I refuse to load?
- What target CLI can I use?

If the answer depends on global agent state beyond login/provider configuration, the pisolate is leaking.

If the agent has to search docs for basic command syntax that the recipe already knows, the recipe is under-specified.

If the agent ignores the caller's project and queries the wrong memory/project/repo first, the launcher lost important intent.

## The Default

The default pisolate should feel like this:

```sh
pi \
  --no-extensions \
  --no-skills \
  --no-prompt-templates \
  --no-themes \
  --no-context-files \
  --model openai-codex/gpt-5.5 \
  --append-system-prompt recipe/prompt.md \
  --append-system-prompt recipe/cli-docs.md \
  --append-system-prompt recipe/.policy-summary.md
```

The point is not to make Pi smaller.

The point is to make Pi show up with only the parts this job needs.
