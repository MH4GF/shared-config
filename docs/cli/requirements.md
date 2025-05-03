# CLIツール要件定義 (`@mh4gf/shared-config init`)

## 概要

このCLIツールは、共通設定リポジトリ `@mh4gf/shared-config` に含まれる設定ファイルをプロジェクトに導入するためのセットアップ自動化ツールです。開発者が `npx @mh4gf/shared-config init` を実行することで、必要な設定のみを選択してインストールできる体験を提供します。

## 実行イメージ

```bash
npx @mh4gf/shared-config init
```

## 目的

* プロジェクト初期構築時に共通設定を即座に適用可能にする
* チームやOSSにおける設定の一貫性を維持する
* 対話UIにより導入時の迷いをなくす

## 想定ユーザー

* 社内プロジェクトの新規開発者
* OSSの初期コントリビューター
* 共通設定を取り入れたい外部ユーザー

## 導入対象となるツールと機能

ユーザーは以下のツールを複数選択して導入可能：

- Biome

  - `biome.json(TypeScript)`
  - `biome.json(TypeScript + React)`

- TypeScript

  - `tsconfig.json`

## 選択UI

Ink を用いた対話UIにて以下のような操作を実現：

```plaintext
🛠 What do you want to set up?
☑ Biome
   └─ TypeScript
   └─ TypeScript + React
☑ TypeScript Config
   └─ base
```

## 使用技術

* CLIフレームワーク: [oclif](https://oclif.io/)
* UIライブラリ: [Ink](https://github.com/vadimdemedes/ink)
* テストフレームワーク: [Vitest](https://vitest.dev/)（常にテストを書くこと）
* 実装言語: TypeScript
* 提供形式: `@mh4gf/configs` の `bin` に含めて配布

## CLIコマンド構成

```
@mh4gf/shared-config
└── init          # 対話UIで設定ファイルを選んで導入
```

## ファイルの処理内容

* 設定ファイルを `templates/` からルートディレクトリにコピー
* 既存ファイルがある場合は上書き確認
* `package.json` に script を追記（重複チェック・マージあり）

## ディレクトリ構成（予定）

```
.
└── typescript/packages/configs/
    └── bin/
        ├── cli.ts
        └── commands/
            └── init/
                ├── ui/
                │   └── InitForm.tsx
                ├── services/
                │   └── configGenerator.tsx
                └── templates/
                    ├── biome
                    └── tsconfig
```

※ テストファイルは、各実装ファイルの隣に配置します（例: `InitForm.test.tsx`, `configGenerator.test.tsx`）

## テストポリシー

* 全ての処理に対して単体テストを実装する
* `vitest` による高速テストの実行とTDD推奨
* 実行前後の状態（e.g. ファイルの存在, package.json への追記）を検証

## 実行フロー（参考）

```mermaid
graph TD
  A[npx @mh4gf/shared-config init] --> B[oclif CLI Dispatcher]
  B --> C[Ink-based UI (InitForm)]
  C --> D{User Selection}
  D -->|Biome| E1[Copy biome.json to project root]
  D -->|tsconfig| E2[Copy tsconfig files]
  D -->|Workflows| E3[Copy GitHub workflows]
  E1 --> F[Update package.json]
  E2 --> F
  E3 --> F
```

---

以上が `@mh4gf/shared-config init` の要件定義および設計内容となります。
