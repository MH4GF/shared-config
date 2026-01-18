# plan-tools Plugin

計画ファイルの要件を明確化・可視化するClaude Codeプラグイン。

## インストール

```
/plugin marketplace add MH4GF/shared-config
/plugin install plan-tools@mh4gf-marketplace
```

## Commands

### `/plan-tools:state-machine`

計画ファイルにステートマシン図（ASCII形式）を追加し、要件を明確化する。

```
/plan-tools:state-machine <計画ファイルのパス>
```

パス省略時は `PLAN.md`, `SPEC.md` などを自動検索。

#### 出力例

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

## ライセンス

MIT
