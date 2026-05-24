# Oracle Plan

Oracle session: `pisolates-bird-recipe`

Bird deserves a pisolate because it combines useful read/search/social-context work with authenticated account risk.

First shippable slice:

- `pi-bird`: interactive read/search/analyze/draft
- `p-bird`: one-shot read/search/analyze/draft

No `pi-bird-post` or `p-bird-post` in this release.

Allowed first release:

- Bird help/version
- Safe subcommand help for read/search/thread/replies/mentions/check/whoami
- `bird check`
- `bird whoami` as sensitive read
- Explicit `bird read <tweet-id-or-url>`
- Explicit `bird thread <tweet-id-or-url>`
- Explicit `bird replies <tweet-id-or-url>`
- Capped `bird search`
- Explicit-user capped `bird mentions`

Deferred:

- Posting/replying/following/unfollowing/unbookmarking
- Bookmarks, likes, home, lists, list timelines
- Following/followers
- `about`, `user-tweets`, `news`, `trending`, `query-ids`
- Raw JSON-full output
- Unbounded pagination
- Any direct config/cookie/profile handling
