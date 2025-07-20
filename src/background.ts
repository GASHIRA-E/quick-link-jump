/// <reference types="chrome"/>

// Service Worker for Quick Link Jump
interface Action {
  name: string;
  urlTemplate: string;
}

let contextMenuItems: Action[] = [];

// 拡張機能のインストール時に初期化
chrome.runtime.onInstalled.addListener(() => {
  console.log("Quick Link Jump installed");
  updateContextMenus();
});

// ストレージの変更を監視してコンテキストメニューを更新
chrome.storage.onChanged.addListener(
  (
    changes: { [key: string]: chrome.storage.StorageChange },
    namespace: string
  ) => {
    if (namespace === "sync" && changes.actions) {
      updateContextMenus();
    }
  }
);

// コンテキストメニューの更新
async function updateContextMenus(): Promise<void> {
  try {
    // Chrome APIの利用可能性をチェック
    if (
      !chrome?.contextMenus?.removeAll ||
      !chrome?.storage?.sync?.get ||
      !chrome?.contextMenus?.create
    ) {
      console.error("Chrome extension API が利用できません");
      return;
    }

    // 既存のメニューを削除
    await chrome.contextMenus.removeAll();

    // ストレージからアクションを取得
    const result = await chrome.storage.sync.get("actions");
    const actions: Action[] = result.actions || [];

    // アクションが存在する場合のみメニューを作成
    if (actions.length > 0) {
      actions.forEach((action, index) => {
        try {
          chrome.contextMenus.create({
            id: `action_${index}`,
            title: action.name,
            contexts: ["selection"],
          });
        } catch (error) {
          console.error(
            `Failed to create context menu for action ${index}:`,
            error
          );
        }
      });
    }

    contextMenuItems = actions;
  } catch (error) {
    console.error("Failed to update context menus:", error);
  }
}

// コンテキストメニューのクリック処理
chrome.contextMenus.onClicked.addListener(
  async (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => {
    const menuItemId = String(info.menuItemId);

    if (menuItemId.startsWith("action_")) {
      const index = parseInt(menuItemId.replace("action_", ""));
      const action = contextMenuItems[index];

      if (action) {
        // 選択テキストが空の場合は空文字列として扱う
        const selectedText = info.selectionText || "";
        // URLテンプレートに選択テキストを埋め込み
        const url = action.urlTemplate.replace(
          "{selText}",
          encodeURIComponent(selectedText)
        );

        // 新規タブでリンクを開く
        try {
          if (!chrome?.tabs?.create) {
            console.error("Chrome tabs API が利用できません");
            return;
          }
          await chrome.tabs.create({ url: url });
        } catch (error) {
          console.error("Failed to open URL:", error);
        }
      }
    }
  }
);
