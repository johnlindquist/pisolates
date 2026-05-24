# bird

`bird` is a read-only/draft-only Pi harness for the Bird X/Twitter CLI. It installs:

- `pi-bird` for interactive read/search/analyze/draft work.
- `p-bird` for one-shot read/search/analyze/draft work.

## First-Release Allowed Surface

- Help/version
- `bird check`
- `bird whoami`
- `bird read <tweet-id-or-url>`
- `bird thread <tweet-id-or-url>`
- `bird replies <tweet-id-or-url>`
- Capped `bird search`
- Explicit-user capped `bird mentions`

## Drafting

The pisolate may draft tweets, replies, quote-tweets, and threads in chat. It does not publish.

## Blocked

- `bird tweet`
- `bird reply`
- `bird follow`
- `bird unfollow`
- `bird unbookmark`
- Media upload flags
- Credential/cookie/profile flags
- Raw JSON-full output
- Unbounded pagination
- Bookmarks, likes, home timeline, lists, list timelines, following, followers
- Direct reads of Bird config or browser cookie stores

## Credentials And Config

This recipe does not install Bird and does not copy, symlink, read, or print Bird config, cookies, browser profiles, or tokens.
