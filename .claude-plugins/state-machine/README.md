# state-machine Plugin

計画ファイルにステートマシン図（ASCII形式）を追加し、要件を明確化するClaude Codeプラグイン。

## 目的

- 状態遷移図で計画をレビューしやすくし、認識齟齬を減らす
- 状態遷移として構造化し、処理の抜け漏れを発見して埋める

## インストール

```
/plugin marketplace add MH4GF/shared-config
/plugin install state-machine@mh4gf-marketplace
```

## 使い方

```
/state-machine:state-machine <計画ファイルのパス>
```

パス省略時は `PLAN.md`, `SPEC.md` などを自動検索。

## 出力例

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
