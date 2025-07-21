# Quick Link Jump 使い方ガイド

---

## この拡張機能について

Quick Link Jumpは、ウェブページ上で選択したテキスト（例：チケット番号やPR番号など）を、あらかじめ登録したURLテンプレートに埋め込んで新しいタブで開くことができるChrome拡張です。JiraやGitHub、Google検索など、さまざまな用途に活用できます。

---

## 主な機能

- 選択テキストを使ったカスタムリンクの即時生成
- URLテンプレートの追加・編集・削除
- アクション（リンク）の並び替え
- 新規タブでのリンクオープン
- 100件までのアクション登録
- セキュリティ対策（XSS防止、http/httpsのみ対応）

---

## インストール方法

1. このリポジトリをクローンまたはダウンロード
2. Chromeで `chrome://extensions/` を開く
3. 「デベロッパーモード」を有効にする
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. このフォルダ（quick-link-jump）を選択

---

## 使い方

1. 拡張機能のアイコンをクリックし、設定ページを開く
2. 「アクション名」と「URLテンプレート」を入力し、「アクションを追加」をクリック
3. ウェブページ上で対象テキストを選択し、右クリックでコンテキストメニューを開く
4. 登録したアクション名をクリックすると、テンプレートに埋め込まれたURLが新規タブで開きます

- `{selText}` が選択テキストに置き換わります
- テキスト未選択でも空のままリンクを開けます

---

## 使用例

| アクション名 | URLテンプレート | 説明 |
|------------|----------------|------|
| Jira Issue | `https://jira.example.com/browse/PROJECT-{selText}` | JiraのIssueを開く |
| GitHub Issue | `https://github.com/org/repo/issues/{selText}` | GitHubのIssueを開く |
| GitHub PR | `https://github.com/org/repo/pull/{selText}` | GitHubのPRを開く |
| Google検索 | `https://www.google.com/search?q={selText}` | Googleで検索 |

---

## よくある質問

---

## 開発者向け情報

開発者向けの詳細は[開発者向けページ](developer.md)をご覧ください。 