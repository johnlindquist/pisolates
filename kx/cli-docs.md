# Karabiner CLI Docs

This reference is loaded at startup. Use it before running help commands.

## kar --help

```text
Fast Karabiner config in TypeScript

Usage: kar [OPTIONS] [COMMAND]

Commands:
  build  Build karabiner.json from config (default command)
  watch  Watch config and rebuild on changes
  init   Create ~/.config/kar/config.ts from example
  help   Print this message or the help of the given subcommand(s)

Options:
  -c, --config <CONFIG>    Path to config file (default: ~/.config/kar/config.ts)
  -p, --profile <PROFILE>  Profile name to update (default: kar) [default: kar]
      --dry-run            Print JSON to stdout instead of writing
  -h, --help               Print help
```

## kar build --help

```text
Build karabiner.json from config (default command)

Usage: kar build [OPTIONS]

Options:
  -c, --config <CONFIG>    Path to config file (default: ~/.config/kar/config.ts)
  -p, --profile <PROFILE>  Profile name to update (default: kar) [default: kar]
      --dry-run            Print JSON to stdout instead of writing
  -h, --help               Print help
```

## kar watch --help

```text
Watch config and rebuild on changes

Usage: kar watch [OPTIONS]

Options:
  -c, --config <CONFIG>    Path to config file (default: ~/.config/kar/config.ts)
  -p, --profile <PROFILE>  Profile name to update (default: kar) [default: kar]
      --dry-run            Print JSON to stdout instead of writing
  -h, --help               Print help
```

## kar init --help

```text
Create ~/.config/kar/config.ts from example

Usage: kar init [OPTIONS]

Options:
  -c, --config <CONFIG>    Path to config file (default: ~/.config/kar/config.ts)
  -p, --profile <PROFILE>  Profile name to update (default: kar) [default: kar]
      --dry-run            Print JSON to stdout instead of writing
  -h, --help               Print help
```

## goku --help

```text
GokuRakuJoudo -- karabiner configurator

goku will read config file and update `Goku` profile in karabiner.json
- goku config file location: /Users/johnlindquist/.config/karabiner.edn
- karabiner config file location:  /Users/johnlindquist/.config/karabiner/karabiner.json
- you can also specify edn file path with env GOKU_EDN_CONFIG_FILE

Usage: run goku without arg to process config once

-l, --log, to open the log file
-d, --dry-run, to spit the new config of modified profiles into stdout instead of update karabiner.json
-A, --dry-run-all, to spit the new whole config into stdout instead of update karabiner.json
-c, --config PATH, to specify edn config file from command line
-h, --help, to show this message
-V, --version, to show current version of goku
```

