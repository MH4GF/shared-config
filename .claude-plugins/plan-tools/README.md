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

## License

MIT
