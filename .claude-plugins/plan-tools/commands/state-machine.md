---
description: Add a state machine diagram to a plan file to clarify requirements
argument-hint: [path to plan file (auto-search if omitted)]
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
context: fork
---

Read a plan file, generate a state machine diagram (ASCII format), and clarify requirements.

<goals>
- Make reviews easier with state transition diagrams, reducing misunderstandings
- Organize as state transitions to discover and fill gaps in processing
- Ask questions via AskUserQuestion for ambiguous points, only reflecting confirmed content in the plan file
</goals>

## Phase 1: Identify the Plan File

If `$ARGUMENTS` is specified, use that file.

If not specified, search in the following order:
1. `**/PLAN.md`, `**/plan.md`
2. `**/SPEC.md`, `**/spec.md`
3. Files in `**/docs/*.md` related to plans or specifications

If not found → confirm with user

## Phase 2: Extract States and Transitions

Identify the following from the plan file:

| Element | Description |
|---------|-------------|
| States | Each state the system can be in |
| Transitions | Movements between states and their triggers |
| Initial state | Starting point of the process |
| End states | Completion points of the process (can be multiple) |

## Phase 3: Completeness Check and Ambiguity Resolution

Detect gaps from the following perspectives:

- Are transitions defined for each state?
- Transitions for error, cancellation, and timeout cases
- Can all flows reach an end state?
- Are there isolated states that cannot be reached from anywhere?

When gaps or ambiguities are found, ask questions using the AskUserQuestion tool.

<constraints>
- 2-4 questions (adjust based on level of ambiguity)
- 2-4 specific options per question
- Include pros and cons for each option
- Avoid open-ended questions ("Other" is automatically added)
</constraints>

Incorporate answers and repeat Phase 2-3. Continue until all state transitions are confirmed.

## Phase 4: Generate ASCII Diagram and Update Plan File

Generate an ASCII diagram from confirmed state transitions and add it to the plan file.

````markdown
## State Machine

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
````

Present a summary of changes at the end.

---

Target: $ARGUMENTS
