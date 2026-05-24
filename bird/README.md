# bird

`bird` is a full-access Bird X/Twitter CLI pisolate. It installs:

- `pi-bird` for interactive Bird work.
- `p-bird` for one-shot Bird work.

The recipe defaults to allowing every `bird` command, including reads, searches, account inspection, posting, replies, follows, bookmarks, lists, media flags, and other write-capable actions. It reuses the user's normal Pi login/model/provider config, but disables ambient Pi extensions, skills, prompt templates, themes, and context files from both global and cwd scopes.
