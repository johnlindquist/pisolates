# zx

`zx` is a full-access zsh configuration pisolate. It installs:

- `pi-zx` for interactive zsh work.
- `p-zx` for one-shot zsh work.

The recipe defaults to allowing every CLI command and arbitrary edits inside the working root. That includes shell commands, package managers, git commands, agent commands, and edits beyond the original wrapper files. It reuses the user's normal Pi login/model/provider config, but disables ambient Pi extensions, skills, prompt templates, themes, and context files from both global and cwd scopes.
