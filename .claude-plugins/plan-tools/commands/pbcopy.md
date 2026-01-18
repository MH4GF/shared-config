---
description: Copy plan file path to clipboard
argument-hint: [path to plan file (skip if already known from context)]
allowed-tools: Bash, Glob
context: fork
---

Copy plan file path to clipboard for use in other sessions or GitHub.

<goals>
1. Identify target plan file
2. Copy path to clipboard
</goals>

## Phase 1: Identify file

If file path is known from conversation context:
- Use that path directly (skip search)

If argument provided:
- Use $ARGUMENTS

Otherwise:
- Search `~/.claude/plans/` for most recent `.md` file

## Phase 2: Copy to clipboard

```bash
echo -n "<file_path>" | pbcopy
```

Report copied path to user.

Target: $ARGUMENTS
