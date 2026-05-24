# bm

`bm` is a full-access Basic Memory pisolate. It installs:

- `pi-bm` for interactive Basic Memory work.
- `p-bm` for one-shot Basic Memory work.

The recipe defaults to allowing every `bm` command, including note search/read/context commands and write/destructive commands. It reuses the user's normal Pi login/model/provider config, but disables ambient Pi extensions, skills, prompt templates, themes, and context files from both global and cwd scopes.

The launcher preserves the invocation directory in `PISOLATE_CALLER_CWD` so the agent can infer the matching Basic Memory project before running `bm tool` queries.
