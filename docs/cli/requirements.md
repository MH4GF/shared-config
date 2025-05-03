# CLI ツール要件定義 (`@mh4gf/shared-config init`)

## 概要

この CLI ツールは、共通設定リポジトリ `@mh4gf/shared-config` に含まれる設定ファイルをプロジェクトに導入するためのセットアップ自動化ツールです。開発者が `npx @mh4gf/shared-config init` を実行することで、必要な設定のみを選択してインストールできる体験を提供します。

## 実行イメージ

```bash
npx @mh4gf/shared-config init
```

## 目的

- プロジェクト初期構築時に共通設定を即座に適用可能にする
- チームや OSS における設定の一貫性を維持する
- 対話 UI により導入時の迷いをなくす

## 想定ユーザー

- 社内プロジェクトの新規開発者
- OSS の初期コントリビューター
- 共通設定を取り入れたい外部ユーザー

## 導入対象となるツールと機能

ユーザーは以下のツールを複数選択して導入可能：

- Biome

  - `biome.json(TypeScript)`
  - `biome.json(TypeScript + React)`

- TypeScript

  - `tsconfig.json`

## 選択 UI

Ink を用いた対話 UI にて以下のような操作を実現：

```plaintext
🛠 What do you want to set up?
☑ Biome
   └─ TypeScript
   └─ TypeScript + React
☑ TypeScript Config
   └─ base
```

## 使用技術

- CLI フレームワーク: [oclif](https://oclif.io/)
- UI ライブラリ: [Ink](https://github.com/vadimdemedes/ink)
- 提供形式: `@mh4gf/configs` の `bin` に含めて配布

## CLI コマンド構成

```
@mh4gf/shared-config
└── init          # 対話UIで設定ファイルを選んで導入
```

## ファイルの処理内容

- `@mh4gf/configs` と、必要なパッケージをインストール
- 設定ファイルを `templates/` からルートディレクトリにコピー
- 既存ファイルがある場合は上書き確認
- `package.json` に script を追記（重複チェック・マージあり）

## フォルダ構成（予定）

```
typescript/packages/configs/
├── bin/
│   └── cli.ts
├── src/
│   ├── commands/
│   │   └── init.ts
│   └── ui/
│       └── InitForm.tsx
├── templates/
│   ├── biome/
│   ├── tsconfig/
│   └── workflows/
```

## 今後の拡張案

- `--yes` / `--all` オプションによる非対話モード
- 設定ファイルのバージョン管理・更新機能
- Vite テンプレートの追加 (`create-mh4gf-app` 的体験)
