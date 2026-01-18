# plan-tools Plugin

A Claude Code plugin for clarifying and visualizing requirements in plan files.

## Installation

```
/plugin marketplace add MH4GF/shared-config
/plugin install plan-tools@mh4gf-marketplace
```

## Commands

### `/plan-tools:state-machine`

Add a state machine diagram (ASCII format) to a plan file to clarify requirements.

```
/plan-tools:state-machine <path to plan file>
```

If path is omitted, automatically searches for `PLAN.md`, `SPEC.md`, etc.

#### Example Output

```
┌─────────┐    submit     ┌───────────┐    approve    ┌──────────┐
│  Draft  │ ────────────► │  Review   │ ─────────────► │ Approved │
└─────────┘               └───────────┘               └──────────┘
     │                          │
     │ cancel                   │ reject
     ▼                          ▼
┌─────────┐               ┌───────────┐
│ Deleted │               │  Draft    │
└─────────┘               └───────────┘
```

### `/plan-tools:pbcopy`

Copy plan file path to clipboard for use in other sessions or GitHub.

```
/plan-tools:pbcopy <path to plan file>
```

If path is omitted, uses the plan file from conversation context or searches `~/.claude/plans/`.

## License

MIT
