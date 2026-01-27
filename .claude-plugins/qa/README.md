# QA Plugin

QA-focused agents and commands for test planning and verification.

## Commands

### e2e-verifier

Execute E2E verification and confirm Plan requirements are met.

```
/qa:e2e-verifier [path/to/qa-file.md]
```

## Agents

### unit-planner

Generate unit test plan from Plan file and existing test patterns.

```
Task tool → subagent_type: "qa:unit-planner"
```

### e2e-planner

Detect project type and generate E2E verification steps. Saves to `.claude/qa/`.

```
Task tool → subagent_type: "qa:e2e-planner"
```

### claude-md-checker

Check CLAUDE.md compliance and report violations.

```
Task tool → subagent_type: "qa:claude-md-checker"
```

## Workflow

```
Create Plan
    │
    ▼
@unit-planner / @e2e-planner
    │
    ▼
Implementation
    │
    ▼
@claude-md-checker ──► [Fail] → Fix → Loop
    │
    ▼ [Pass]
/qa:e2e-verifier ──► [Fail] → Fix → Loop
    │
    ▼ [Pass]
Complete
```

## Severity Criteria

| Level | Criteria |
|-------|----------|
| **Critical** | Broken functionality, data loss, security vulnerability |
| **High** | Core feature affected, severely degraded UX |
| **Medium** | Secondary feature affected, workaround exists |
| **Low** | Minor issue, improvement suggestion |
