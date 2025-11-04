# mh4gf Plugin

MH4GF's reusable Claude Code commands for workflow automation. This plugin provides utility commands for code review and documentation management.

## Quick Start

### Installation

**Claude Code で**以下のコマンドを実行します：

1. マーケットプレイスを追加（GitHub から直接）:

   ```
   /plugin marketplace add MH4GF/shared-config
   ```

2. plugin をインストール:

   ```
   /plugin install mh4gf@mh4gf-marketplace
   ```

3. インストール確認:

   ```
   /plugin list
   ```

   `mh4gf` が表示されていれば成功です。

## Commands

### `/mh4gf:compact-docs` - ドキュメント圧縮

**何ができる:** ドキュメントの冗長性を削減し、明瞭性を向上させる圧縮コマンド。重複情報削減、表現の簡潔化、構造の整理を一括実行。

**いつ使う:** ドキュメントが肥大化した時、情報の整理が必要な時、読みやすさを改善したい時

**使い方:** `/mh4gf:compact-docs <file_path>`

詳細は `commands/compact-docs.md` を参照。

---

### `/mh4gf:ts-review` - TypeScript コードレビュー

**何ができる:** 拡張思考を用いた包括的なコードレビュー。型安全性、パフォーマンス、保守性、セキュリティなど、多角的な観点からコードを分析。

**いつ使う:** PR レビュー時、コード品質向上時、リファクタリング前の分析時

**使い方:**
- `/mh4gf:ts-review` (全変更をレビュー)
- `/mh4gf:ts-review <PR番号>` (特定のPRをレビュー)
- `/mh4gf:ts-review <file_path>` (特定のファイルをレビュー)

詳細は `commands/ts-review.md` を参照。

## Appendix

### 詳細なインストール方法

**ローカル開発版を使いたい場合:**
1. `/plugin marketplace add /Users/mh4gf/ghq/github.com/MH4GF/shared-config`
2. `/plugin install mh4gf@mh4gf-marketplace`
3. `/plugin list` で確認

**Plugin更新方法:**
```bash
/plugin marketplace update mh4gf-marketplace
/plugin install mh4gf@mh4gf-marketplace
```

### トラブルシューティング

**Q: pluginが見つからない** → マーケットプレイス名を確認: `mh4gf@mh4gf-marketplace`

**Q: 古いバージョンのまま** → `/plugin marketplace update mh4gf-marketplace` → `/plugin uninstall mh4gf@mh4gf-marketplace` → `/plugin install mh4gf@mh4gf-marketplace`

### Plugin の構造

```
.claude-plugins/mh4gf/
├── .claude-plugin/
│   └── plugin.json              # Pluginメタデータ
├── commands/
│   ├── compact-docs.md          # ドキュメント圧縮コマンド
│   └── ts-review.md             # TypeScriptコードレビューコマンド
└── README.md                    # このファイル
```

## ライセンス

MIT

## 作者

MH4GF
