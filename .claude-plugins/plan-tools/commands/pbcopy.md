---
description: Copy plan file content or path to clipboard
argument-hint: [file path] [--path]
allowed-tools: Bash, Glob, Read
context: fork
---

Copy plan file content (default) or path to clipboard.

## Arguments

- `--path`: copy file path instead of content

## Identify file

1. If file path known from context → use it
2. If file path in $ARGUMENTS → use it
3. Otherwise → find most recent `.md` in `~/.claude/plans/`

## Copy

Default (content):
```bash
cat "<file_path>" | pbcopy
```

With `--path`:
```bash
echo -n "<file_path>" | pbcopy
```

Report what was copied.
