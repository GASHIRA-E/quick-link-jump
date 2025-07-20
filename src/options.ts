/// <reference types="chrome"/>

// Options page JavaScript for Quick Link Jump

interface Action {
  id: string;
  name: string;
  urlTemplate: string;
}

class ActionManager {
  private actions: Action[] = [];

  constructor() {
    this.init();
  }

  async init(): Promise<void> {
    await this.loadActions();
    this.setupEventListeners();
    this.renderActions();
  }

  async loadActions(): Promise<void> {
    try {
      const result = await chrome.storage.sync.get('actions');
      this.actions = result.actions || [];
    } catch (error) {
      console.error('Failed to load actions:', error);
      this.actions = [];
    }
  }

  async saveActions(): Promise<void> {
    try {
      await chrome.storage.sync.set({ actions: this.actions });
    } catch (error) {
      console.error('Failed to save actions:', error);
    }
  }

  setupEventListeners(): void {
    const form = document.getElementById('actionForm') as HTMLFormElement;
    if (form) {
      form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }
  }

  async handleFormSubmit(e: Event): Promise<void> {
    e.preventDefault();
    
    const nameInput = document.getElementById('actionName') as HTMLInputElement;
    const urlInput = document.getElementById('urlTemplate') as HTMLInputElement;
    
    const name = nameInput.value.trim();
    const urlTemplate = urlInput.value.trim();
    
    // バリデーション
    if (!this.validateAction(name, urlTemplate)) {
      return;
    }
    
    // アクション数の上限チェック
    if (this.actions.length >= 100) {
      this.showError('urlError', 'アクション数は100個まで登録できます');
      return;
    }
    
    // アクションを追加
    const newAction: Action = {
      id: Date.now().toString(),
      name: name,
      urlTemplate: urlTemplate
    };
    
    this.actions.push(newAction);
    await this.saveActions();
    
    // フォームをリセット
    nameInput.value = '';
    urlInput.value = '';
    this.clearErrors();
    
    // アクション一覧を更新
    this.renderActions();
    
    this.showSuccess('アクションが追加されました');
  }

  validateAction(name: string, urlTemplate: string): boolean {
    this.clearErrors();
    let isValid = true;
    
    // アクション名のバリデーション
    if (!name) {
      this.showError('nameError', 'アクション名を入力してください');
      isValid = false;
    } else if (name.length > 40) {
      this.showError('nameError', 'アクション名は40文字以内で入力してください');
      isValid = false;
    }
    
    // URLテンプレートのバリデーション
    if (!urlTemplate) {
      this.showError('urlError', 'URLテンプレートを入力してください');
      isValid = false;
    } else if (!urlTemplate.includes('{selText}')) {
      this.showError('urlError', 'URLテンプレートには {selText} を含めてください');
      isValid = false;
    }
    
    return isValid;
  }

  showError(elementId: string, message: string): void {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  clearErrors(): void {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(element => {
      element.textContent = '';
    });
  }

  showSuccess(message: string): void {
    // 成功メッセージを表示（簡易実装）
    console.log(message);
  }

  async deleteAction(actionId: string): Promise<void> {
    if (confirm('このアクションを削除しますか？')) {
      this.actions = this.actions.filter(action => action.id !== actionId);
      await this.saveActions();
      this.renderActions();
    }
  }

  async moveAction(fromIndex: number, toIndex: number): Promise<void> {
    if (toIndex < 0 || toIndex >= this.actions.length) {
      return;
    }
    
    const action = this.actions.splice(fromIndex, 1)[0];
    this.actions.splice(toIndex, 0, action);
    await this.saveActions();
    this.renderActions();
  }

  renderActions(): void {
    const actionsList = document.getElementById('actionsList');
    if (!actionsList) return;
    
    if (this.actions.length === 0) {
      actionsList.innerHTML = '<p style="color: #666; text-align: center;">登録されたアクションがありません</p>';
      return;
    }
    
    actionsList.innerHTML = this.actions.map((action, index) => `
      <div class="action-item" data-action-id="${action.id}">
        <div class="action-controls">
          ${index > 0 ? `<span class="drag-handle" onclick="actionManager.moveAction(${index}, ${index - 1})">↑</span>` : ''}
          ${index < this.actions.length - 1 ? `<span class="drag-handle" onclick="actionManager.moveAction(${index}, ${index + 1})">↓</span>` : ''}
          <button class="btn btn-danger" onclick="actionManager.deleteAction('${action.id}')">削除</button>
        </div>
        <div class="action-name">${this.escapeHtml(action.name)}</div>
        <div class="action-url">${this.escapeHtml(action.urlTemplate)}</div>
      </div>
    `).join('');
  }

  escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// 初期化
let actionManager: ActionManager;
document.addEventListener('DOMContentLoaded', () => {
  actionManager = new ActionManager();
  (window as any).actionManager = actionManager;
});

export {}; 