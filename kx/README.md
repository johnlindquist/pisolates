# kx

`kx` is a full-access Karabiner/`kar` pisolate. It installs:

- `pi-kx` for interactive Karabiner config work.
- `p-kx` for one-shot Karabiner config work.

The recipe defaults to allowing every CLI command and arbitrary edits inside the working root. That includes live `kar` applies, `goku`, shell commands, package managers, git commands, and edits beyond `kar-migration/config.ts`. It reuses the user's normal Pi login/model/provider config, but disables ambient Pi extensions, skills, prompt templates, themes, and context files from both global and cwd scopes.
