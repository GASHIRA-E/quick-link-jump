# 開発者向け情報

## 技術仕様

- Manifest V3対応
- Service Worker利用
- chrome.storage.syncでデータ同期
- chrome.contextMenusでコンテキストメニュー
- chrome.tabsでタブ操作
- アクションの並び替え機能
- HTMLエスケープ処理によるXSS対策

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

## ローカル開発

1. ファイルを編集
2. `chrome://extensions/` で「更新」ボタンをクリック
3. 変更が反映されます

## デバッグ

- 拡張機能の「詳細」→「Service Worker を検査」でログを確認
- 設定ページは通常のウェブページとしてデバッグ可能

## セキュリティ

- http/httpsのURLのみ対応
- 選択テキストは `encodeURIComponent` でエンコード
- アクション名はHTMLエスケープ処理でXSS対策

## ライセンス

MIT License 