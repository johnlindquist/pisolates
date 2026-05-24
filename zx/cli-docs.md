# zsh / Codex Wrapper CLI Docs

This reference is loaded at startup. Use it before running help commands.

## zsh --help

```text
Usage: zsh [<options>] [<argument> ...]

Special options:
  --help     show this message, then exit
  --version  show zsh version number, then exit
  -b         end option processing, like --
  -c         take first argument as a command to execute
  -o OPTION  set an option by name (see below)

Normal options are named.  An option may be turned on by
`-o OPTION', `--OPTION', `+o no_OPTION' or `+-no-OPTION'.  An
option may be turned off by `-o no_OPTION', `--no-OPTION',
`+o OPTION' or `+-OPTION'.  Options are listed below only in
`--OPTION' or `--no-OPTION' form.

Named options:
  --aliases
  --aliasfuncdef
  --allexport
  --alwayslastprompt
  --alwaystoend
  --appendcreate
  --appendhistory
  --autocd
  --autocontinue
  --autolist
  --automenu
  --autonamedirs
  --autoparamkeys
  --autoparamslash
  --autopushd
  --autoremoveslash
  --autoresume
  --badpattern
  --banghist
  --bareglobqual
  --bashautolist
  --bashrematch
  --beep
  --bgnice
  --braceccl
  --bsdecho
  --caseglob
  --casematch
  --casepaths
  --cbases
  --cdablevars
  --cdsilent
  --chasedots
  --chaselinks
  --checkjobs
  --checkrunningjobs
  --clobber
  --clobberempty
  --combiningchars
  --completealiases
  --completeinword
  --continueonerror
  --correct
  --correctall
  --cprecedences
  --cshjunkiehistory
  --cshjunkieloops
  --cshjunkiequotes
  --cshnullcmd
  --cshnullglob
  --debugbeforecmd
  --dvorak
  --emacs
  --equals
  --errexit
  --errreturn
  --evallineno
  --exec
  --extendedglob
  --extendedhistory
  --flowcontrol
  --forcefloat
  --functionargzero
  --glob
  --globalexport
  --globalrcs
  --globassign
  --globcomplete
  --globdots
  --globstarshort
  --globsubst
  --hashcmds
  --hashdirs
  --hashexecutablesonly
  --hashlistall
  --histallowclobber
  --histbeep
  --histexpiredupsfirst
  --histfcntllock
  --histfindnodups
  --histignorealldups
  --histignoredups
  --histignorespace
  --histlexwords
  --histnofunctions
  --histnostore
  --histreduceblanks
  --histsavebycopy
  --histsavenodups
  --histsubstpattern
  --histverify
  --hup
  --ignorebraces
  --ignoreclosebraces
  --ignoreeof
  --incappendhistory
  --incappendhistorytime
  --interactive
  --interactivecomments
  --ksharrays
  --kshautoload
  --kshglob
  --kshoptionprint
  --kshtypeset
  --kshzerosubscript
  --listambiguous
  --listbeep
  --listpacked
  --listrowsfirst
  --listtypes
  --localloops
  --localoptions
  --localpatterns
  --localtraps
  --login
  --longlistjobs
  --magicequalsubst
  --mailwarning
  --markdirs
  --menucomplete
  --monitor
  --multibyte
  --multifuncdef
  --multios
  --nomatch
  --notify
  --nullglob
  --numericglobsort
  --octalzeroes
  --overstrike
  --pathdirs
  --pathscript
  --pipefail
  --posixaliases
  --posixargzero
  --posixbuiltins
  --posixcd
  --posixidentifiers
  --posixjobs
  --posixstrings
  --posixtraps
  --printeightbit
  --printexitvalue
  --privileged
  --promptbang
  --promptcr
  --promptpercent
  --promptsp
  --promptsubst
  --pushdignoredups
  --pushdminus
  --pushdsilent
  --pushdtohome
  --rcexpandparam
  --rcquotes
  --rcs
  --recexact
  --rematchpcre
  --restricted
  --rmstarsilent
  --rmstarwait
  --sharehistory
  --shfileexpansion
  --shglob
  --shinstdin
  --shnullcmd
  --shoptionletters
  --shortloops
  --shortrepeat
  --shwordsplit
  --singlecommand
  --singlelinezle
  --sourcetrace
  --sunkeyboardhack
  --transientrprompt
  --trapsasync
  --typesetsilent
  --typesettounset
  --unset
  --verbose
  --vi
  --warncreateglobal
  --warnnestedvar
  --xtrace
  --zle

Option aliases:
  --braceexpand            equivalent to --no-ignorebraces
  --dotglob                equivalent to --globdots
  --hashall                equivalent to --hashcmds
  --histappend             equivalent to --appendcreate
  --histexpand             equivalent to --badpattern
  --log                    equivalent to --no-histnofunctions
  --mailwarn               equivalent to --mailwarning
  --onecmd                 equivalent to --singlecommand
  --physical               equivalent to --cdsilent
  --promptvars             equivalent to --promptsubst
  --stdin                  equivalent to --shinstdin
  --trackall               equivalent to --hashcmds

Option letters:
  -0    equivalent to --completeinword
  -1    equivalent to --printexitvalue
  -2    equivalent to --no-autoresume
  -3    equivalent to --no-nomatch
  -4    equivalent to --globdots
  -5    equivalent to --notify
  -6    equivalent to --beep
  -7    equivalent to --ignoreeof
  -8    equivalent to --markdirs
  -9    equivalent to --autocontinue
  -B    equivalent to --no-bashrematch
  -C    equivalent to --no-checkjobs
  -D    equivalent to --pushdtohome
  -E    equivalent to --pushdsilent
  -F    equivalent to --no-glob
  -G    equivalent to --nullglob
  -H    equivalent to --rmstarsilent
  -I    equivalent to --ignorebraces
  -J    equivalent to --appendhistory
  -K    equivalent to --no-badpattern
  -L    equivalent to --sunkeyboardhack
  -M    equivalent to --singlelinezle
  -N    equivalent to --autoparamslash
  -O    equivalent to --continueonerror
  -P    equivalent to --rcexpandparam
  -Q    equivalent to --pathdirs
  -R    equivalent to --longlistjobs
  -S    equivalent to --recexact
  -T    equivalent to --cbases
  -U    equivalent to --mailwarning
  -V    equivalent to --no-promptcr
  -W    equivalent to --autoremoveslash
  -X    equivalent to --listtypes
  -Y    equivalent to --menucomplete
  -Z    equivalent to --zle
  -a    equivalent to --allexport
  -d    equivalent to --no-globalrcs
  -e    equivalent to --errexit
  -f    equivalent to --no-rcs
  -g    equivalent to --histignorespace
  -h    equivalent to --histignoredups
  -i    equivalent to --interactive
  -k    equivalent to --interactivecomments
  -l    equivalent to --login
  -m    equivalent to --monitor
  -n    equivalent to --no-exec
  -p    equivalent to --privileged
  -r    equivalent to --restricted
  -s    equivalent to --shinstdin
  -t    equivalent to --singlecommand
  -u    equivalent to --no-unset
  -v    equivalent to --verbose
  -w    equivalent to --cdsilent
  -x    equivalent to --xtrace
  -y    equivalent to --shwordsplit
```

## codex --help

```text
Codex CLI

If no subcommand is specified, options will be forwarded to the interactive CLI.

Usage: codex [OPTIONS] [PROMPT]
       codex [OPTIONS] <COMMAND> [ARGS]

Commands:
  exec            Run Codex non-interactively [aliases: e]
  review          Run a code review non-interactively
  login           Manage login
  logout          Remove stored authentication credentials
  mcp             Manage external MCP servers for Codex
  plugin          Manage Codex plugins
  mcp-server      Start Codex as an MCP server (stdio)
  app-server      [experimental] Run the app server or related tooling
  remote-control  [experimental] Manage the app-server daemon with remote control enabled
  app             Launch the Codex desktop app (opens the app installer if missing)
  completion      Generate shell completion scripts
  update          Update Codex to the latest version
  doctor          Diagnose local Codex installation, config, auth, and runtime health
  sandbox         Run commands within a Codex-provided sandbox
  debug           Debugging tools
  apply           Apply the latest diff produced by Codex agent as a `git apply` to your local
                  working tree [aliases: a]
  resume          Resume a previous interactive session (picker by default; use --last to continue
                  the most recent)
  fork            Fork a previous interactive session (picker by default; use --last to fork the
                  most recent)
  cloud           [EXPERIMENTAL] Browse tasks from Codex Cloud and apply changes locally
  exec-server     [EXPERIMENTAL] Run the standalone exec-server service
  features        Inspect feature flags
  help            Print this message or the help of the given subcommand(s)

Arguments:
  [PROMPT]
          Optional user prompt to start the session

Options:
  -c, --config <key=value>
          Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`.
          Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed
          as TOML. If it fails to parse as TOML, the raw string is used as a literal.
          
          Examples: - `-c model="o3"` - `-c 'sandbox_permissions=["disk-full-read-access"]'` - `-c
          shell_environment_policy.inherit=all`

      --enable <FEATURE>
          Enable a feature (repeatable). Equivalent to `-c features.<name>=true`

      --disable <FEATURE>
          Disable a feature (repeatable). Equivalent to `-c features.<name>=false`

      --remote <ADDR>
          Connect the TUI to a remote app server endpoint.
          
          Accepted forms: `ws://host:port`, `wss://host:port`, `unix://`, or `unix://PATH`.

      --remote-auth-token-env <ENV_VAR>
          Name of the environment variable containing the bearer token to send to a remote app
          server websocket

      --strict-config
          Error out when config.toml contains fields that are not recognized by this version of
          Codex

  -i, --image <FILE>...
          Optional image(s) to attach to the initial prompt

  -m, --model <MODEL>
          Model the agent should use

      --oss
          Use open-source provider

      --local-provider <OSS_PROVIDER>
          Specify which local provider to use (lmstudio or ollama). If not specified with --oss,
          will use config default or show selection

  -p, --profile <CONFIG_PROFILE>
          Configuration profile from config.toml to specify default options

      --profile-v2 <CONFIG_PROFILE_V2>
          Layer $CODEX_HOME/<name>.config.toml on top of the base user config

  -s, --sandbox <SANDBOX_MODE>
          Select the sandbox policy to use when executing model-generated shell commands
          
          [possible values: read-only, workspace-write, danger-full-access]

      --dangerously-bypass-approvals-and-sandbox
          Skip all confirmation prompts and execute commands without sandboxing. EXTREMELY
          DANGEROUS. Intended solely for running in environments that are externally sandboxed

      --dangerously-bypass-hook-trust
          Run enabled hooks without requiring persisted hook trust for this invocation. DANGEROUS.
          Intended only for automation that already vets hook sources

  -C, --cd <DIR>
          Tell the agent to use the specified directory as its working root

      --add-dir <DIR>
          Additional directories that should be writable alongside the primary workspace

  -a, --ask-for-approval <APPROVAL_POLICY>
          Configure when the model requires human approval before executing a command

          Possible values:
          - untrusted:  Only run "trusted" commands (e.g. ls, cat, sed) without asking for user
            approval. Will escalate to the user if the model proposes a command that is not in the
            "trusted" set
          - on-failure: DEPRECATED: Run all commands without asking for user approval. Only asks for
            approval if a command fails to execute, in which case it will escalate to the user to
            ask for un-sandboxed execution. Prefer `on-request` for interactive runs or `never` for
            non-interactive runs
          - on-request: The model decides when to ask the user for approval
          - never:      Never ask for user approval Execution failures are immediately returned to
            the model

      --search
          Enable live web search. When enabled, the native Responses `web_search` tool is available
          to the model (no per‑call approval)

      --no-alt-screen
          Disable alternate screen mode
          
          Runs the TUI in inline mode, preserving terminal scrollback history.

  -h, --help
          Print help (see a summary with '-h')

  -V, --version
          Print version
```

## codex exec --help

```text
Run Codex non-interactively

Usage: codex exec [OPTIONS] [PROMPT]
       codex exec [OPTIONS] <COMMAND> [ARGS]

Commands:
  resume  Resume a previous session by id or pick the most recent with --last
  review  Run a code review against the current repository
  help    Print this message or the help of the given subcommand(s)

Arguments:
  [PROMPT]
          Initial instructions for the agent. If not provided as an argument (or if `-` is used),
          instructions are read from stdin. If stdin is piped and a prompt is also provided, stdin
          is appended as a `<stdin>` block

Options:
  -c, --config <key=value>
          Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`.
          Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed
          as TOML. If it fails to parse as TOML, the raw string is used as a literal.
          
          Examples: - `-c model="o3"` - `-c 'sandbox_permissions=["disk-full-read-access"]'` - `-c
          shell_environment_policy.inherit=all`

      --enable <FEATURE>
          Enable a feature (repeatable). Equivalent to `-c features.<name>=true`

      --disable <FEATURE>
          Disable a feature (repeatable). Equivalent to `-c features.<name>=false`

      --strict-config
          Error out when config.toml contains fields that are not recognized by this version of
          Codex

  -i, --image <FILE>...
          Optional image(s) to attach to the initial prompt

  -m, --model <MODEL>
          Model the agent should use

      --oss
          Use open-source provider

      --local-provider <OSS_PROVIDER>
          Specify which local provider to use (lmstudio or ollama). If not specified with --oss,
          will use config default or show selection

  -p, --profile <CONFIG_PROFILE>
          Configuration profile from config.toml to specify default options

      --profile-v2 <CONFIG_PROFILE_V2>
          Layer $CODEX_HOME/<name>.config.toml on top of the base user config

  -s, --sandbox <SANDBOX_MODE>
          Select the sandbox policy to use when executing model-generated shell commands
          
          [possible values: read-only, workspace-write, danger-full-access]

      --dangerously-bypass-approvals-and-sandbox
          Skip all confirmation prompts and execute commands without sandboxing. EXTREMELY
          DANGEROUS. Intended solely for running in environments that are externally sandboxed

      --dangerously-bypass-hook-trust
          Run enabled hooks without requiring persisted hook trust for this invocation. DANGEROUS.
          Intended only for automation that already vets hook sources

  -C, --cd <DIR>
          Tell the agent to use the specified directory as its working root

      --add-dir <DIR>
          Additional directories that should be writable alongside the primary workspace

      --skip-git-repo-check
          Allow running Codex outside a Git repository

      --ephemeral
          Run without persisting session files to disk

      --ignore-user-config
          Do not load `$CODEX_HOME/config.toml`; auth still uses `CODEX_HOME`

      --ignore-rules
          Do not load user or project execpolicy `.rules` files

      --output-schema <FILE>
          Path to a JSON Schema file describing the model's final response shape

      --color <COLOR>
          Specifies color settings for use in the output
          
          [default: auto]
          [possible values: always, never, auto]

      --json
          Print events to stdout as JSONL

  -o, --output-last-message <FILE>
          Specifies file where the last message from the agent should be written

  -h, --help
          Print help (see a summary with '-h')

  -V, --version
          Print version
```

## codex debug --help

```text
Debugging tools

Usage: codex debug [OPTIONS] <COMMAND>

Commands:
  models        Render the raw model catalog as JSON
  app-server    Tooling: helps debug the app server
  prompt-input  Render the model-visible prompt input list as JSON
  help          Print this message or the help of the given subcommand(s)

Options:
  -c, --config <key=value>
          Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`.
          Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed
          as TOML. If it fails to parse as TOML, the raw string is used as a literal.
          
          Examples: - `-c model="o3"` - `-c 'sandbox_permissions=["disk-full-read-access"]'` - `-c
          shell_environment_policy.inherit=all`

      --enable <FEATURE>
          Enable a feature (repeatable). Equivalent to `-c features.<name>=true`

      --disable <FEATURE>
          Disable a feature (repeatable). Equivalent to `-c features.<name>=false`

  -h, --help
          Print help (see a summary with '-h')
```

## codex mcp --help

```text
Manage external MCP servers for Codex

Usage: codex mcp [OPTIONS] <COMMAND>

Commands:
  list    
  get     
  add     
  remove  
  login   
  logout  
  help    Print this message or the help of the given subcommand(s)

Options:
  -c, --config <key=value>
          Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`.
          Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed
          as TOML. If it fails to parse as TOML, the raw string is used as a literal.
          
          Examples: - `-c model="o3"` - `-c 'sandbox_permissions=["disk-full-read-access"]'` - `-c
          shell_environment_policy.inherit=all`

      --enable <FEATURE>
          Enable a feature (repeatable). Equivalent to `-c features.<name>=true`

      --disable <FEATURE>
          Disable a feature (repeatable). Equivalent to `-c features.<name>=false`

  -h, --help
          Print help (see a summary with '-h')
```

## codex plugin --help

```text
Manage Codex plugins

Usage: codex plugin [OPTIONS] <COMMAND>

Commands:
  add          Install a plugin from a configured marketplace snapshot
  list         List plugins available from configured marketplace snapshots
  marketplace  Add, list, upgrade, or remove configured plugin marketplaces
  remove       Remove an installed plugin from local config and cache
  help         Print this message or the help of the given subcommand(s)

Options:
  -c, --config <key=value>
          Override a configuration value that would otherwise be loaded from `~/.codex/config.toml`.
          Use a dotted path (`foo.bar.baz`) to override nested values. The `value` portion is parsed
          as TOML. If it fails to parse as TOML, the raw string is used as a literal.
          
          Examples: - `-c model="o3"` - `-c 'sandbox_permissions=["disk-full-read-access"]'` - `-c
          shell_environment_policy.inherit=all`

      --enable <FEATURE>
          Enable a feature (repeatable). Equivalent to `-c features.<name>=true`

      --disable <FEATURE>
          Disable a feature (repeatable). Equivalent to `-c features.<name>=false`

  -h, --help
          Print help (see a summary with '-h')
```

