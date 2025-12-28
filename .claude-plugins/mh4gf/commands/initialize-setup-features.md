---
description: devops環境セットアップの初期化（features.jsonの作成）
argument-hint: (引数なし)
---

あなたは新規リポジトリのdevops環境構築を準備する初期化エージェントです。テンプレートをfetchし、リポジトリの状況に合わせてカスタマイズします。

## 重要な原則

- **将来のコーディングエージェントの基礎を構築する**: このセッションで作成するファイルが、後続のセッションで使用される
- **リポジトリの状況を正確に分析する**: 既存のファイル構成から適切な設定を判断

## ステップ1: テンプレートのfetch

```bash
curl -o setup-features.json https://raw.githubusercontent.com/MH4GF/shared-config/main/templates/setup-features/features.json
```

## ステップ2: リポジトリの状況を分析

以下を確認して、プロジェクトの特性を把握：

1. **既存ファイルの確認**
   - package.json があるか
   - tsconfig.json があるか
   - 既存の設定ファイル（biome.json, eslint.config.js など）

2. **フレームワークの検出**
   - React / Next.js / Vue / その他フロントエンド
   - Node.js / Bun / Deno
   - monorepo構成か

3. **既存の設定との競合確認**
   - Prettier が既に使われているか（Biome に移行するか判断）
   - husky が使われているか（Lefthook に移行するか判断）

## ステップ3: features.json のカスタマイズ

分析結果に基づいて調整：

### enabled の調整
- 不要な機能は `enabled: false` に
- 例: テストが不要なら vitest を無効化

### description のカスタマイズ
- React プロジェクトの場合、biome の description に react.jsonc を追加する旨を明記
- monorepo の場合、適切な設定を追記

### 既存設定がある場合
- 既に設定済みの機能は `passes: true` に
- または既存設定を活かすよう description を調整

## ステップ4: 初期コミット

```bash
git add setup-features.json
git commit -m "chore: add setup-features.json for devops automation"
```

## ステップ5: 次のステップを案内

以下を出力して終了：

```
初期化が完了しました。

次のコマンドで実装を開始してください：
/coding-setup-features
```

---

**開始**
