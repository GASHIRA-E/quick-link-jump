# Quick Link Jump

Quick Link Jumpは、ウェブページ上で選択したテキスト（例：チケット番号やPR番号など）を、あらかじめ登録したURLテンプレートに埋め込んで新しいタブで開くことができるChrome拡張機能です。

例えばJiraのチケット番号のみ共有された時に、チケット番号を選択しこの機能を使うことで簡単にチケットを開くことができます。

## 主な機能

- 選択テキストを使ったカスタムリンクの即時生成
- URLテンプレートの追加・編集・削除
- アクション（リンク）の並び替え
- 新規タブでのリンクオープン
- 最大100件までのアクション登録
- React + EmotionによるモダンなUI

## インストール方法

1. このリポジトリをクローンまたはダウンロード
2. `npm install` を実行し、依存パッケージをインストール
3. `npm run build` を実行し、`quick-link-jump`フォルダにビルドされたファイルが生成
4. Chromeで `chrome://extensions/` を開く
5. 「デベロッパーモード」を有効にする
6. 「パッケージ化されていない拡張機能を読み込む」をクリック
7. `quick-link-jump/quick-link-jump` フォルダを選択

## 使い方

### アクションの登録

1. 拡張機能のアイコンをクリックし、設定ページを開く
2. 「アクション名」と「URLテンプレート」を入力し、「アクションを追加」をクリック
   - `{selText}` が選択テキストに置き換わります
   - テキスト未選択でも空のままリンクを開けます

#### 設定例

| アクション名 | URLテンプレート                                     | 説明                |
| ------------ | --------------------------------------------------- | ------------------- |
| Jira Issue   | `https://jira.example.com/browse/PROJECT-{selText}` | JiraのIssueを開く   |
| GitHub Issue | `https://github.com/org/repo/issues/{selText}`      | GitHubのIssueを開く |
| GitHub PR    | `https://github.com/org/repo/pull/{selText}`        | GitHubのPRを開く    |
| Google検索   | `https://www.google.com/search?q={selText}`         | Googleで検索        |

### アクションの利用

1. ウェブページ上で対象テキスト（例：チケット番号など）を選択します。
2. 右クリックして「Quick Link Jump」のサブメニューを開きます。
3. 登録したアクション名をクリックします。
4. 新規タブでリンクが開きます。

## 技術構成・特徴

- **Manifest V3**対応
- **React + Emotion**によるUI実装
- **Service Worker**利用
- **chrome.storage.sync**でデータ同期
- **chrome.contextMenus**でコンテキストメニュー
- **chrome.tabs**でタブ操作
- HTMLエスケープ処理によるXSS対策
- 選択テキストは `encodeURIComponent` でエンコード
- http/httpsのURLのみ対応

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

1. `npm install` を実行し、依存パッケージをインストール
2. `npm run dev` でwatchモードビルド
3. Chromeで `chrome://extensions/` を開き「更新」ボタンで反映

詳細は `docs/developer.md` も参照してください。

## ライセンス

MIT License 