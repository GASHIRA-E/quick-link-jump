# Quick Link Jump

選択したテキストをURLテンプレートに埋め込んでリンクを開くChrome拡張機能です。

## 機能

- テキスト選択時にコンテキストメニューに登録済みアクションを表示
- カスタムURLテンプレートの追加・編集・削除
- アクションの並び替え
- 新規タブでリンクを開く

## インストール方法

1. このリポジトリをクローンまたはダウンロード
2. Chromeで `chrome://extensions/` を開く
3. 「デベロッパーモード」を有効にする
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. このフォルダを選択

## 使用方法

### 1. アクションの登録

1. 拡張機能のアイコンをクリックして設定ページを開く
2. 「アクション名」と「URLテンプレート」を入力
3. 「アクションを追加」をクリック

### 2. 使用例

| アクション名 | URLテンプレート | 説明 |
|------------|----------------|------|
| Jira Issue | `https://jira.example.com/browse/PROJECT-{selText}` | JiraのIssueを開く |
| GitHub Issue | `https://github.com/org/repo/issues/{selText}` | GitHubのIssueを開く |
| GitHub PR | `https://github.com/org/repo/pull/{selText}` | GitHubのPRを開く |
| Google検索 | `https://www.google.com/search?q={selText}` | Googleで検索 |

**制限事項:**
- アクション名は40文字以内
- 登録可能なアクション数は100個まで
- http/httpsのURLのみ対応

### 3. 使用方法

1. ウェブページでIssue番号やPR番号などのテキストを選択（空でも可）
2. 右クリックしてコンテキストメニューを開く
3. 登録したアクション名をクリック
4. 新規タブでリンクが開く

**注意:** テキストを選択しなくても、空の状態でリンクを開くことができます

## ファイル構成

```
quick-link-jump/
├── manifest.json      # 拡張機能の設定ファイル
├── background.js      # Service Worker（バックグラウンド処理）
├── options.html       # 設定ページ
├── options.js         # 設定ページのJavaScript
├── README.md          # このファイル
└── 指示書.md          # 開発指示書
```

## 技術仕様

- **Manifest V3**対応
- **Service Worker**使用
- **chrome.storage.sync**でデータ同期
- **chrome.contextMenus**でコンテキストメニュー
- **chrome.tabs**でタブ操作
- アクションの並び替え機能
- HTMLエスケープ処理によるXSS対策

## セキュリティ

- http/httpsのURLのみ対応
- 選択テキストは `encodeURIComponent` でエンコードされます
- アクション名はHTMLエスケープ処理でXSS対策

## トラブルシューティング

### コンテキストメニューが表示されない
- 拡張機能が有効になっているか確認
- 設定ページでアクションが登録されているか確認
- ページを再読み込みしてみてください

### リンクが開かない
- URLテンプレートに `{selText}` が含まれているか確認
- http/httpsのURLであることを確認
- アクション数が100個を超えていないか確認

## 開発者向け

### ローカル開発
1. ファイルを編集
2. `chrome://extensions/` で「更新」ボタンをクリック
3. 変更が反映されます

### デバッグ
- 拡張機能の「詳細」→「Service Worker を検査」でログを確認
- 設定ページは通常のウェブページとしてデバッグ可能

## ライセンス

MIT License 