---
description: features.jsonに基づいてdevops環境を実装
argument-hint: [features.jsonのパス] (デフォルト: setup-features.json)
---

あなたは新規リポジトリのdevops環境構築を実装するコーディングエージェントです。features.jsonに定義された機能を順次実装し、各機能が完了するごとにgitコミットします。

**前提**: `/initialize-setup-features` で features.json が作成済みであること

## 重要な原則

- **1機能の完璧さ**: 複数機能を同時にではなく、1つの機能を完璧に実装してから次へ
- **passesフィールドのみ変更可能**: features.jsonの他のフィールドは変更しない
- **ACが全て通るまで完了としない**: acceptanceCriteriaが全て成功するまでpassesをtrueにしない

## ステップ1: 環境把握（Get Your Bearings）

**あなたは新しいコンテキストウィンドウで作業を開始しています。前のセッションの記憶はありません。**

1. **features.jsonの読み込み**
   - `$ARGUMENTS` が指定されている場合はそのパスから
   - 空の場合は `setup-features.json` から

2. **既存の状態確認**
   - `git log --oneline -10` で直近のコミットを確認
   - どの機能まで完了しているか把握
   - package.json の現在の状態を確認

## ステップ2: 次の機能を選択

features.jsonから次に実装する機能を選択：

1. `enabled: true` かつ `passes: false` の機能を抽出
2. `dependsOn` の機能が全て `passes: true` であることを確認
3. `priority` の小さい順に選択

**選択した機能を明示的に宣言してから作業を開始する**

## ステップ3: 機能の実装

選択した機能を実装：

### 共通パッケージのインストール
```bash
bun add -D @mh4gf/configs @mh4gf/eslint-config
```

### package.json scripts の構成例
```json
{
  "scripts": {
    "all": "bun run typecheck && bun run format:check && bun run lint:check && bun run knip:check",
    "typecheck": "tsc --noEmit",
    "format:check": "biome check .",
    "format:fix": "biome check . --write",
    "lint:check": "eslint .",
    "lint:fix": "eslint . --fix",
    "knip:check": "knip",
    "knip:fix": "knip --fix"
  }
}
```

### 設定ファイルの例

**tsconfig.json**
```json
{
  "extends": "@mh4gf/configs/tsconfig/base.json"
}
```

**biome.json**
```json
{
  "extends": ["./node_modules/@mh4gf/configs/biome/index.jsonc"]
}
```

**eslint.config.js**
```javascript
import mh4gf from '@mh4gf/eslint-config'
export default [...mh4gf.configs.recommended, ...mh4gf.configs.typescript]
```

## ステップ4: 受け入れ条件の検証

acceptanceCriteriaを全て検証：

- `type: "command"`: コマンドを実行し exit code 0 を確認
- `type: "file"`: ファイルの存在を確認
- `type: "contains"`: ファイル内に指定パターンが存在することを確認

**全てのACが成功するまで、修正を繰り返す**

## ステップ5: 完了処理

1. **features.jsonを更新**: 該当機能の `passes: true` に変更
2. **gitコミット**:
   ```bash
   git add -A
   git commit -m "feat: setup <機能名>"
   ```

## ステップ6: 次の機能へ

ステップ2に戻り、次の機能を選択。全ての `enabled: true` な機能が `passes: true` になるまで繰り返す。

## セッション終了時

コンテキストが消費される前に：

1. 未コミットの変更がないことを確認
2. 現在の進捗を確認（何機能完了、何機能残り）
3. 次のセッションで再開できる状態であることを確認

---

**開始**: $ARGUMENTS
