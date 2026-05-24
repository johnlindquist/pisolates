# Basic Memory CLI Docs

This reference is loaded at startup. Use it before running help commands.

## bm --help

```text
Usage: bm [OPTIONS] COMMAND [ARGS]...                                          
                                                                                
 Basic Memory - Local-first personal knowledge management.                      
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --version             -v        Show version and exit.                       │
│ --install-completion            Install completion for the current shell.    │
│ --show-completion               Show completion for the current shell, to    │
│                                 copy it or customize the installation.       │
│ --help                          Show this message and exit.                  │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Commands ───────────────────────────────────────────────────────────────────╮
│ status   Show sync status between files and database.                        │
│ reset    Reset database (drop all tables and recreate).                      │
│ reindex  Rebuild search indexes and/or vector embeddings without dropping    │
│          the database.                                                       │
│ doctor   Run local consistency checks to verify file/database sync.          │
│ mcp      Run the MCP server with configurable transport options.             │
│ format   Format files using configured formatters.                           │
│ update   Check for updates and install when supported.                       │
│ import   Import data from various sources                                    │
│ cloud    Access Basic Memory Cloud                                           │
│ tool     Access to MCP tools via CLI                                         │
│ project  Manage multiple Basic Memory projects                               │
│ schema   Schema management commands                                          │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm status --help

```text
Usage: bm status [OPTIONS]                                                     
                                                                                
 Show sync status between files and database.                                   
                                                                                
 Use --json for machine-readable output.                                        
 Use --local to force local routing when cloud mode is enabled.                 
 Use --cloud to force cloud routing when cloud mode is disabled.                
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --project          TEXT  The project name.                                   │
│ --verbose  -v            Show detailed file information                      │
│ --json                   Output in JSON format                               │
│ --local                  Force local API routing (ignore cloud mode)         │
│ --cloud                  Force cloud API routing                             │
│ --help                   Show this message and exit.                         │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm doctor --help

```text
Usage: bm doctor [OPTIONS]                                                     
                                                                                
 Run local consistency checks to verify file/database sync.                     
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --local          Force local API routing (ignore cloud mode)                 │
│ --cloud          Force cloud API routing                                     │
│ --help           Show this message and exit.                                 │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm project --help

```text
Usage: bm project [OPTIONS] COMMAND [ARGS]...                                  
                                                                                
 Manage multiple Basic Memory projects                                          
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --help          Show this message and exit.                                  │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Commands ───────────────────────────────────────────────────────────────────╮
│ list       List Basic Memory projects from local and (when available) cloud. │
│ add        Add a new project.                                                │
│ remove     Remove a project.                                                 │
│ default    Set the default project used as fallback when no project is       │
│            specified.                                                        │
│ move       Move a local project to a new filesystem location.                │
│ set-cloud  Set a project to cloud mode (route through cloud API).            │
│ set-local  Revert a project to local mode (use in-process ASGI transport).   │
│ ls         List files in a project.                                          │
│ info       Display detailed information and statistics about the current     │
│            project.                                                          │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm import --help

```text
Usage: bm import [OPTIONS] COMMAND [ARGS]...                                   
                                                                                
 Import data from various sources                                               
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --help          Show this message and exit.                                  │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Commands ───────────────────────────────────────────────────────────────────╮
│ memory-json  Import entities and relations from a memory.json file.          │
│ chatgpt      Import conversations from ChatGPT JSON export.                  │
│ claude       Import Conversations from Claude JSON export.                   │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm format --help

```text
Usage: bm format [OPTIONS] [PATH]                                              
                                                                                
 Format files using configured formatters.                                      
                                                                                
 Uses the formatter_command or formatters settings from your config.            
 By default, formats all .md, .json, and .canvas files in the current project.  
                                                                                
 Examples:                                                                      
     bm format                    # Format all files in current project         
     bm format --project research # Format files in specific project            
     bm format notes/meeting.md   # Format a specific file                      
     bm format notes/             # Format all files in directory               
                                                                                
╭─ Arguments ──────────────────────────────────────────────────────────────────╮
│   path      [PATH]  File or directory to format. Defaults to current         │
│                     project.                                                 │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --project  -p      TEXT  Project name to format.                             │
│ --help                   Show this message and exit.                         │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm reset --help

```text
Usage: bm reset [OPTIONS]                                                      
                                                                                
 Reset database (drop all tables and recreate).                                 
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --reindex          Rebuild db index from filesystem                          │
│ --help             Show this message and exit.                               │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm reindex --help

```text
Usage: bm reindex [OPTIONS]                                                    
                                                                                
 Rebuild search indexes and/or vector embeddings without dropping the database. 
                                                                                
 By default rebuilds everything (search + embeddings if semantic is enabled).   
 Use --search or --embeddings to rebuild only one.                              
                                                                                
 Examples:                                                                      
     bm reindex                  # Rebuild everything                           
     bm reindex --embeddings     # Only rebuild vector embeddings               
     bm reindex --search         # Only rebuild FTS index                       
     bm reindex -p claw          # Reindex only the 'claw' project              
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --embeddings  -e            Rebuild vector embeddings (requires semantic     │
│                             search)                                          │
│ --search      -s            Rebuild full-text search index                   │
│ --project     -p      TEXT  Reindex a specific project (default: all)        │
│ --help                      Show this message and exit.                      │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm mcp --help

```text
Usage: bm mcp [OPTIONS]                                                        
                                                                                
 Run the MCP server with configurable transport options.                        
                                                                                
 This command starts an MCP server using one of three transport options:        
                                                                                
 - stdio: Standard I/O (good for local usage)                                   
 - streamable-http: Recommended for web deployments                             
 - sse: Server-Sent Events (for compatibility with existing clients)            
                                                                                
 Initialization, file sync, and cleanup are handled by the MCP server's         
 lifespan.                                                                      
                                                                                
 Note: This command is available regardless of cloud mode setting.              
 Users who have cloud mode enabled can still use local MCP for Claude Code      
 and Claude Desktop while using cloud MCP for web and mobile access.            
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --transport        TEXT     Transport type: stdio, streamable-http, or sse   │
│                             [default: stdio]                                 │
│ --host             TEXT     Host for HTTP transports (use 0.0.0.0 to allow   │
│                             external connections)                            │
│                             [default: 0.0.0.0]                               │
│ --port             INTEGER  Port for HTTP transports [default: 8000]         │
│ --path             TEXT     Path prefix for streamable-http transport        │
│                             [default: /mcp]                                  │
│ --project          TEXT     Restrict MCP server to single project            │
│ --help                      Show this message and exit.                      │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm cloud --help

```text
Usage: bm cloud [OPTIONS] COMMAND [ARGS]...                                    
                                                                                
 Access Basic Memory Cloud                                                      
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --help          Show this message and exit.                                  │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Commands ───────────────────────────────────────────────────────────────────╮
│ login         Authenticate with WorkOS using OAuth Device Authorization      │
│               flow.                                                          │
│ logout        Remove stored OAuth tokens.                                    │
│ status        Check cloud authentication and connection status.              │
│ setup         Set up cloud sync by installing rclone and configuring         │
│               credentials.                                                   │
│ promo         Enable or disable CLI cloud promo messages.                    │
│ upload        Upload local files or directories to cloud project via WebDAV. │
│ sync          One-way sync: local -> cloud (make cloud identical to local).  │
│ bisync        Two-way sync: local <-> cloud (bidirectional sync).            │
│ check         Verify file integrity between local and cloud.                 │
│ bisync-reset  Clear bisync state for a project.                              │
│ sync-setup    Configure local sync for an existing cloud project.            │
│ restore       Restore a file or folder from a snapshot.                      │
│ api-key       Manage cloud API keys                                          │
│ snapshot      Manage bucket snapshots                                        │
│ workspace     Manage cloud workspaces                                        │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm tool --help

```text
Usage: bm tool [OPTIONS] COMMAND [ARGS]...                                     
                                                                                
 Access to MCP tools via CLI                                                    
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --help          Show this message and exit.                                  │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Commands ───────────────────────────────────────────────────────────────────╮
│ write-note       Create or update a markdown note. Content can be provided   │
│                  via --content or stdin.                                     │
│ read-note        Read a markdown note from the knowledge base.               │
│ edit-note        Edit an existing markdown note using                        │
│                  append/prepend/find_replace/replace_section.                │
│ build-context    Get context needed to continue a discussion.                │
│ recent-activity  Get recent activity across the knowledge base.              │
│ search-notes     Search across all content in the knowledge base.            │
│ list-projects    List all available projects with their status (JSON         │
│                  output).                                                    │
│ list-workspaces  List available cloud workspaces (JSON output).              │
│ schema-validate  Validate notes against their schemas (JSON output).         │
│ schema-infer     Infer schema from existing notes of a type (JSON output).   │
│ schema-diff      Show drift between schema and actual usage (JSON output).   │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm schema --help

```text
Usage: bm schema [OPTIONS] COMMAND [ARGS]...                                   
                                                                                
 Schema management commands                                                     
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --help          Show this message and exit.                                  │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Commands ───────────────────────────────────────────────────────────────────╮
│ validate  Validate notes against their schemas.                              │
│ infer     Infer schema from existing notes of a type.                        │
│ diff      Show drift between schema and actual usage.                        │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm tool write-note --help

```text
Usage: bm tool write-note [OPTIONS]                                            
                                                                                
 Create or update a markdown note. Content can be provided via --content or     
 stdin.                                                                         
                                                                                
 Examples:                                                                      
                                                                                
 bm tool write-note --title "My Note" --folder "notes" --content "Note content" 
 echo "content" | bm tool write-note --title "My Note" --folder "notes"         
 bm tool write-note --title "My Note" --folder "notes" --local                  
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ *  --title            TEXT  The title of the note [required]                 │
│ *  --folder           TEXT  The folder to create the note in [required]      │
│    --content          TEXT  The content of the note. If not provided,        │
│                             content will be read from stdin.                 │
│    --tags             TEXT  A list of tags to apply to the note              │
│    --project          TEXT  The project to write to. If not provided, the    │
│                             default project will be used.                    │
│    --workspace        TEXT  Cloud workspace tenant ID or unique name to      │
│                             route this request.                              │
│    --local                  Force local API routing (ignore cloud mode)      │
│    --cloud                  Force cloud API routing                          │
│    --help                   Show this message and exit.                      │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm tool read-note --help

```text
Usage: bm tool read-note [OPTIONS] IDENTIFIER                                  
                                                                                
 Read a markdown note from the knowledge base.                                  
                                                                                
 Examples:                                                                      
                                                                                
 bm tool read-note my-note                                                      
 bm tool read-note my-note --include-frontmatter                                
 bm tool read-note my-note --page 2 --page-size 5                               
                                                                                
╭─ Arguments ──────────────────────────────────────────────────────────────────╮
│ *    identifier      TEXT  [required]                                        │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --include-frontmatter                 Include YAML frontmatter in output     │
│ --page                       INTEGER  Page number for pagination             │
│                                       [default: 1]                           │
│ --page-size                  INTEGER  Number of results per page             │
│                                       [default: 10]                          │
│ --project                    TEXT     The project to use. If not provided,   │
│                                       the default project will be used.      │
│ --workspace                  TEXT     Cloud workspace tenant ID or unique    │
│                                       name to route this request.            │
│ --local                               Force local API routing (ignore cloud  │
│                                       mode)                                  │
│ --cloud                               Force cloud API routing                │
│ --help                                Show this message and exit.            │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm tool edit-note --help

```text
Usage: bm tool edit-note [OPTIONS] IDENTIFIER                                  
                                                                                
 Edit an existing markdown note using                                           
 append/prepend/find_replace/replace_section.                                   
                                                                                
 Examples:                                                                      
                                                                                
 bm tool edit-note my-note --operation append --content "new content"           
 bm tool edit-note my-note --operation find_replace --find-text "old" --content 
 "new"                                                                          
 bm tool edit-note my-note --operation replace_section --section "## Notes"     
 --content "updated"                                                            
                                                                                
╭─ Arguments ──────────────────────────────────────────────────────────────────╮
│ *    identifier      TEXT  [required]                                        │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ *  --operation                    TEXT     Edit operation to apply           │
│                                            [required]                        │
│ *  --content                      TEXT     Content for the edit operation    │
│                                            [required]                        │
│    --find-text                    TEXT     Text to find for find_replace     │
│                                            operation                         │
│    --section                      TEXT     Section heading for               │
│                                            replace_section operation         │
│    --expected-replacements        INTEGER  Expected replacement count for    │
│                                            find_replace operation            │
│                                            [default: 1]                      │
│    --project                      TEXT     The project to edit. If not       │
│                                            provided, the default project     │
│                                            will be used.                     │
│    --workspace                    TEXT     Cloud workspace tenant ID or      │
│                                            unique name to route this         │
│                                            request.                          │
│    --local                                 Force local API routing (ignore   │
│                                            cloud mode)                       │
│    --cloud                                 Force cloud API routing           │
│    --help                                  Show this message and exit.       │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm tool build-context --help

```text
Usage: bm tool build-context [OPTIONS] URL                                     
                                                                                
 Get context needed to continue a discussion.                                   
                                                                                
 Examples:                                                                      
                                                                                
 bm tool build-context memory://specs/search                                    
 bm tool build-context specs/search --depth 2 --timeframe 30d                   
                                                                                
╭─ Arguments ──────────────────────────────────────────────────────────────────╮
│ *    url      TEXT  [required]                                               │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --depth              INTEGER  Depth of context to build [default: 1]         │
│ --timeframe          TEXT     Timeframe filter (e.g., '7d', '1 week')        │
│                               [default: 7d]                                  │
│ --page               INTEGER  Page number for pagination [default: 1]        │
│ --page-size          INTEGER  Number of results per page [default: 10]       │
│ --max-related        INTEGER  Maximum related items to return [default: 10]  │
│ --project            TEXT     The project to use. If not provided, the       │
│                               default project will be used.                  │
│ --workspace          TEXT     Cloud workspace tenant ID or unique name to    │
│                               route this request.                            │
│ --local                       Force local API routing (ignore cloud mode)    │
│ --cloud                       Force cloud API routing                        │
│ --help                        Show this message and exit.                    │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm tool recent-activity --help

```text
Usage: bm tool recent-activity [OPTIONS]                                       
                                                                                
 Get recent activity across the knowledge base.                                 
                                                                                
 Examples:                                                                      
                                                                                
 bm tool recent-activity                                                        
 bm tool recent-activity --timeframe 30d --page-size 20                         
 bm tool recent-activity --type entity --type observation                       
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --type             TEXT     Filter by item type                              │
│ --depth            INTEGER  Depth of context to build [default: 1]           │
│ --timeframe        TEXT     Timeframe filter (e.g., '7d', '1 week')          │
│                             [default: 7d]                                    │
│ --page             INTEGER  Page number for pagination [default: 1]          │
│ --page-size        INTEGER  Number of results per page [default: 50]         │
│ --project          TEXT     The project to use. If not provided, the default │
│                             project will be used.                            │
│ --workspace        TEXT     Cloud workspace tenant ID or unique name to      │
│                             route this request.                              │
│ --local                     Force local API routing (ignore cloud mode)      │
│ --cloud                     Force cloud API routing                          │
│ --help                      Show this message and exit.                      │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm tool search-notes --help

```text
Usage: bm tool search-notes [OPTIONS] [QUERY]                                  
                                                                                
 Search across all content in the knowledge base.                               
                                                                                
 Examples:                                                                      
                                                                                
 bm tool search-notes "my query"                                                
 bm tool search-notes --permalink "specs/*"                                     
 bm tool search-notes --tag python --tag async                                  
 bm tool search-notes --meta status=draft                                       
                                                                                
╭─ Arguments ──────────────────────────────────────────────────────────────────╮
│   query      [QUERY]  Search query string (optional when using metadata      │
│                       filters)                                               │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --permalink                   Search permalink values                        │
│ --title                       Search title values                            │
│ --vector                      Use vector retrieval                           │
│ --hybrid                      Use hybrid retrieval                           │
│ --after_date         TEXT     Search results after date, eg. '2d', '1 week'  │
│ --tag                TEXT     Filter by frontmatter tag (repeatable)         │
│ --status             TEXT     Filter by frontmatter status                   │
│ --type               TEXT     Filter by frontmatter type (repeatable)        │
│ --entity-type        TEXT     Filter by search item type: entity,            │
│                               observation, relation (repeatable)             │
│ --meta               TEXT     Filter by frontmatter key=value (repeatable)   │
│ --filter             TEXT     JSON metadata filter (advanced)                │
│ --page               INTEGER  Page number for pagination [default: 1]        │
│ --page-size          INTEGER  Number of results per page [default: 10]       │
│ --project            TEXT     The project to use. If not provided, the       │
│                               default project will be used.                  │
│ --workspace          TEXT     Cloud workspace tenant ID or unique name to    │
│                               route this request.                            │
│ --local                       Force local API routing (ignore cloud mode)    │
│ --cloud                       Force cloud API routing                        │
│ --help                        Show this message and exit.                    │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm tool list-projects --help

```text
Usage: bm tool list-projects [OPTIONS]                                         
                                                                                
 List all available projects with their status (JSON output).                   
                                                                                
 Examples:                                                                      
                                                                                
 bm tool list-projects                                                          
 bm tool list-projects --local                                                  
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --local          Force local API routing (ignore cloud mode)                 │
│ --cloud          Force cloud API routing                                     │
│ --help           Show this message and exit.                                 │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm tool list-workspaces --help

```text
Usage: bm tool list-workspaces [OPTIONS]                                       
                                                                                
 List available cloud workspaces (JSON output).                                 
                                                                                
 Examples:                                                                      
                                                                                
 bm tool list-workspaces                                                        
 bm tool list-workspaces --cloud                                                
                                                                                
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --local          Force local API routing (ignore cloud mode)                 │
│ --cloud          Force cloud API routing                                     │
│ --help           Show this message and exit.                                 │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm tool schema-validate --help

```text
Usage: bm tool schema-validate [OPTIONS] [TARGET]                              
                                                                                
 Validate notes against their schemas (JSON output).                            
                                                                                
 TARGET can be a note path (e.g., people/ada-lovelace.md) or a note type        
 (e.g., person). If omitted, validates all notes that have schemas.             
                                                                                
 Examples:                                                                      
                                                                                
 bm tool schema-validate person                                                 
 bm tool schema-validate people/ada-lovelace.md                                 
 bm tool schema-validate --project research                                     
                                                                                
╭─ Arguments ──────────────────────────────────────────────────────────────────╮
│   target      [TARGET]  Note path or note type to validate                   │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --project          TEXT  The project to use. If not provided, the default    │
│                          project will be used.                               │
│ --workspace        TEXT  Cloud workspace tenant ID or unique name to route   │
│                          this request.                                       │
│ --local                  Force local API routing (ignore cloud mode)         │
│ --cloud                  Force cloud API routing                             │
│ --help                   Show this message and exit.                         │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm tool schema-infer --help

```text
Usage: bm tool schema-infer [OPTIONS] NOTE_TYPE                                
                                                                                
 Infer schema from existing notes of a type (JSON output).                      
                                                                                
 Examples:                                                                      
                                                                                
 bm tool schema-infer person                                                    
 bm tool schema-infer meeting --threshold 0.5                                   
 bm tool schema-infer person --project research                                 
                                                                                
╭─ Arguments ──────────────────────────────────────────────────────────────────╮
│ *    note_type      TEXT  Note type to analyze (e.g., person, meeting)       │
│                           [required]                                         │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --threshold        FLOAT  Minimum frequency for optional fields (0-1)        │
│                           [default: 0.25]                                    │
│ --project          TEXT   The project to use. If not provided, the default   │
│                           project will be used.                              │
│ --workspace        TEXT   Cloud workspace tenant ID or unique name to route  │
│                           this request.                                      │
│ --local                   Force local API routing (ignore cloud mode)        │
│ --cloud                   Force cloud API routing                            │
│ --help                    Show this message and exit.                        │
╰──────────────────────────────────────────────────────────────────────────────╯
```

## bm tool schema-diff --help

```text
Usage: bm tool schema-diff [OPTIONS] NOTE_TYPE                                 
                                                                                
 Show drift between schema and actual usage (JSON output).                      
                                                                                
 Examples:                                                                      
                                                                                
 bm tool schema-diff person                                                     
 bm tool schema-diff person --project research                                  
                                                                                
╭─ Arguments ──────────────────────────────────────────────────────────────────╮
│ *    note_type      TEXT  Note type to check for drift [required]            │
╰──────────────────────────────────────────────────────────────────────────────╯
╭─ Options ────────────────────────────────────────────────────────────────────╮
│ --project          TEXT  The project to use. If not provided, the default    │
│                          project will be used.                               │
│ --workspace        TEXT  Cloud workspace tenant ID or unique name to route   │
│                          this request.                                       │
│ --local                  Force local API routing (ignore cloud mode)         │
│ --cloud                  Force cloud API routing                             │
│ --help                   Show this message and exit.                         │
╰──────────────────────────────────────────────────────────────────────────────╯
```

