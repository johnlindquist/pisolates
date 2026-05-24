# zx

`zx` is a full-access zsh configuration pisolate. It installs:

- `pi-zx` for interactive zsh work.
- `p-zx` for one-shot zsh work.

The recipe defaults to allowing every CLI command and arbitrary edits inside the working root. That includes shell commands, package managers, git commands, agent commands, and edits beyond the original wrapper files. Pisolates still provides a stable launcher, isolated working directory, isolated Pi session state, and recipe-specific prompt, but it is not a privacy sandbox.
