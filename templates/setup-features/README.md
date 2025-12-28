# Setup Features Template

新規リポジトリのdevops環境構築を自動化するための機能リストテンプレート。

## 使い方

### 1. 初期化

```
/initialize-setup-features
```

- テンプレートをfetch
- リポジトリの状況を分析
- `enabled` を調整
- 初期コミット

### 2. 実装

```
/coding-setup-features
```

- features.json に従って1機能ずつ実装
- AC検証 → passes更新 → コミット
- 全機能完了まで繰り返し

## features.json の構造

```json
{
  "id": "biome",
  "name": "Biome設定",
  "description": "実装の詳細指示",
  "category": "code-quality",
  "priority": 3,
  "enabled": true,
  "dependsOn": ["package-manager"],
  "acceptanceCriteria": [
    { "type": "command", "command": "bun run format:check", "expectSuccess": true }
  ],
  "passes": false
}
```

| フィールド | 説明 |
|-----------|------|
| `enabled` | この機能を実装するか |
| `dependsOn` | 依存する機能（これらが完了後に実行） |
| `acceptanceCriteria` | 完了条件 |
| `passes` | 完了したか（エージェントが更新） |
