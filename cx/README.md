# cx

`cx` is a full-access cmux-oriented pisolate. It installs:

- `pi-cx` for interactive cmux work.
- `p-cx` for one-shot cmux work.

The recipe defaults to allowing every CLI command, including all `cmux` commands and shell composition. It reuses the user's normal Pi login/model/provider config, but disables ambient Pi extensions, skills, prompt templates, themes, and context files from both global and cwd scopes.
