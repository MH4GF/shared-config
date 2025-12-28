---
description: devops環境セットアップの初期化（features.jsonの作成）
argument-hint: (引数なし)
---

新規リポジトリのdevops環境構築を準備する。テンプレートをfetchし、リポジトリの状況に合わせてカスタマイズする。

**冪等性**: 何度実行しても安全。既存の `passes` 状態を保持しつつ、新規featureをマージする。

## ステップ1: 現状確認とテンプレート取得

```bash
# テンプレートを一時ファイルに取得
curl -s -o /tmp/features-template.json https://raw.githubusercontent.com/MH4GF/shared-config/main/templates/setup-features/features.json
```

既存の `setup-features.json` を確認：
- **存在する場合**: ステップ2へ（マージ処理）
- **存在しない場合**: ステップ3へ（新規作成）

## ステップ2: 既存ファイルとのマージ（既存ファイルがある場合のみ）

1. テンプレートの各featureをループ
2. 既存ファイルに同じ `id` のfeatureがあれば `passes` を保持
3. 新規featureはそのまま追加

マージ後、ステップ4へ進む。

## ステップ3: リポジトリ分析と新規作成

以下を確認してプロジェクト特性を把握：

- **既存ファイル**: package.json, tsconfig.json, biome.json, eslint.config.js など
- **フレームワーク**: React / Next.js / Vue / Node.js / Bun
- **競合設定**: Prettier（→Biome移行）、husky（→Lefthook移行）

分析結果に基づいて調整：
- 不要な機能は `enabled: false`
- React の場合、biome の description に react.jsonc 追加を明記
- 既に設定済みの機能は `passes: true`

## ステップ4: コミット

```bash
git add setup-features.json
git commit -m "chore: update setup-features.json"
```

**注意**: 差分がない場合はコミットをスキップ。

## ステップ5: 完了

```
初期化が完了しました。

次のコマンドで実装を開始してください：
/mh4gf-devops-setup:coding-setup-features
```

---

**開始**
