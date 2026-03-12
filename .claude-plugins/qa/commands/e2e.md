---
description: Execute E2E verification and confirm Plan requirements are met
argument-hint: "[path/to/qa-file.md]"
allowed-tools: Read, Grep, Glob, Bash, Write
agent: general-purpose
---

Execute E2E verification steps and report results.

## Find Verification Plan

Search in this order:
1. If qa file path provided in $ARGUMENTS → read that file
2. Search `.claude/qa/` for related verification files
3. Extract "E2E Verification Plan" section from Plan file (backward compatibility)

**If no plan found**: Output `"No E2E Verification Plan found. Run /qa:e2e-planner first."`

Record the **source name** for report saving:
- qa file → filename without extension (e.g. `qa-file-persistence`)
- Plan file → filename without extension (e.g. `fuzzy-inventing-llama`)

## Review Past Reports

Search `.claude/qa/reports/` for files matching the source name prefix. If found, read the most recent report and note:
- Previously failed steps and their causes
- Issues Found and Recommendations sections

Pay extra attention to these areas during verification.

## Execute Verification

Per project type:
- **Web**: Use Chrome Dev Tools MCP if available
- **CLI/Library**: Run commands via Bash

Record pass/fail for each step.

**IMPORTANT**: If Chrome Dev Tools MCP unavailable for Web projects, output manual checklist instead.

## Output Format

```markdown
## E2E Verification Report

### Target
[What the Plan aims to achieve]

### Project Type
[Web / CLI / Library / Other]

### Results

| Step | Action | Expected | Actual | Status |
|------|--------|----------|--------|--------|
| 1 | [action] | [expected] | [actual] | ✅/❌ |

### Screenshots
<!-- Web projects only -->
- Step 1: [path]

### Summary
- Total: X steps
- Passed: X
- Failed: X

### Issues Found

1. **[Issue]** - Severity: [Critical/High/Medium/Low]
   - Step: [step number]
   - Expected: [expected result]
   - Actual: [actual result]
   - File: `path/to/file.ts:42` (if applicable)

### Recommendations
- [Improvement suggestions]
```

## Save Report

Save the report to `.claude/qa/reports/{source-name}-{YYYY-MM-DD}.md`.

If a file with that name exists, append a sequential number (`-2`, `-3`, etc.).

## Severity Criteria

| Level | Criteria |
|-------|----------|
| **Critical** | Broken functionality, data loss, security vulnerability |
| **High** | Core feature affected, severely degraded UX |
| **Medium** | Secondary feature affected, workaround exists |
| **Low** | Minor issue, improvement suggestion |
