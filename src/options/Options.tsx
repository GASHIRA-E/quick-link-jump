/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Button from "../common/parts/Button";
import Input from "../common/parts/Input";
import Card from "../common/parts/Card";

interface Action {
  id: string;
  name: string;
  urlTemplate: string;
}

const containerStyle = css`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const titleStyle = css`
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`;

const inputGroupStyle = css`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

const inputGroupInputStyle = css`
  flex: 1;
`;

const exampleStyle = css`
  background: #e7f3ff;
  border: 1px solid #b3d9ff;
  border-radius: 4px;
  padding: 15px;
  margin: 20px 0;
`;

const exampleTitleStyle = css`
  margin-top: 0;
  color: #0066cc;
`;

const exampleListStyle = css`
  margin: 10px 0;
  padding-left: 20px;
`;

const exampleItemStyle = css`
  margin-bottom: 5px;
`;

const errorStyle = css`
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
`;

const successStyle = css`
  color: #28a745;
  font-size: 12px;
  margin-top: 5px;
`;

const actionsListStyle = css`
  margin-top: 30px;
`;

const actionItemStyle = css`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 10px;
  position: relative;
`;

const actionNameStyle = css`
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
`;

const actionUrlStyle = css`
  color: #666;
  font-family: monospace;
  font-size: 12px;
  word-break: break-all;
`;

const actionControlsStyle = css`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const dragHandleStyle = css`
  cursor: move;
  color: #999;
  margin-right: 10px;
`;

const emptyMessageStyle = css`
  color: #666;
  text-align: center;
`;

const Options: React.FC = () => {
  const [actions, setActions] = useState<Action[]>([]);
  const [actionName, setActionName] = useState("");
  const [urlTemplate, setUrlTemplate] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    loadActions();
  }, []);

  const loadActions = async (): Promise<void> => {
    try {
      const result = await chrome.storage.sync.get("actions");
      setActions(result.actions || []);
    } catch (error) {
      console.error("Failed to load actions:", error);
      setActions([]);
    }
  };



  const validateAction = (name: string, urlTemplate: string): boolean => {
    const newErrors: { [key: string]: string } = {};
    let isValid = true;

    if (!name) {
      newErrors.name = "アクション名を入力してください";
      isValid = false;
    } else if (name.length > 40) {
      newErrors.name = "アクション名は40文字以内で入力してください";
      isValid = false;
    }

    if (!urlTemplate) {
      newErrors.url = "URLテンプレートを入力してください";
      isValid = false;
    } else if (!urlTemplate.includes("{selText}")) {
      newErrors.url = "URLテンプレートには {selText} を含めてください";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!validateAction(actionName, urlTemplate)) {
      return;
    }

    if (actions.length >= 100) {
      setErrors({ url: "アクション数は100個まで登録できます" });
      return;
    }

    const newAction: Action = {
      id: Date.now().toString(),
      name: actionName,
      urlTemplate: urlTemplate,
    };

    const newActions = [...actions, newAction];
    setActions(newActions);
    await chrome.storage.sync.set({ actions: newActions });

    setActionName("");
    setUrlTemplate("");
    setErrors({});
    setSuccessMessage("アクションが追加されました");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const deleteAction = async (actionId: string): Promise<void> => {
    if (confirm("このアクションを削除しますか？")) {
      const newActions = actions.filter((action) => action.id !== actionId);
      setActions(newActions);
      await chrome.storage.sync.set({ actions: newActions });
    }
  };

  const moveAction = async (
    fromIndex: number,
    toIndex: number
  ): Promise<void> => {
    if (toIndex < 0 || toIndex >= actions.length) {
      return;
    }

    const newActions = [...actions];
    const action = newActions.splice(fromIndex, 1)[0];
    newActions.splice(toIndex, 0, action);
    setActions(newActions);
    await chrome.storage.sync.set({ actions: newActions });
  };

  const insertSelText = (): void => {
    const urlInput = document.getElementById("urlTemplate") as HTMLInputElement;
    if (!urlInput) return;

    const cursorPos = urlInput.selectionStart ?? 0;
    const textBefore = urlInput.value.substring(0, cursorPos);
    const textAfter = urlInput.value.substring(
      urlInput.selectionEnd ?? cursorPos
    );

    const newValue = textBefore + "{selText}" + textAfter;
    setUrlTemplate(newValue);

    // カーソル位置を{selText}の後ろに移動
    setTimeout(() => {
      const newCursorPos = cursorPos + "{selText}".length;
      urlInput.setSelectionRange(newCursorPos, newCursorPos);
      urlInput.focus();
    }, 0);
  };

  const escapeHtml = (text: string): string => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };

  return (
    <div css={containerStyle}>
      <Card>
        <h1 css={titleStyle}>Quick Link Jump 設定</h1>

        <div css={exampleStyle}>
          <h3 css={exampleTitleStyle}>使用例</h3>
          <ul css={exampleListStyle}>
            <li css={exampleItemStyle}>
              <strong>Jira Issue:</strong>
              <code>https://jira.example.com/browse/PROJECT-{"{selText}"}</code>
            </li>
            <li css={exampleItemStyle}>
              <strong>GitHub Issue:</strong>
              <code>https://github.com/org/repo/issues/{"{selText}"}</code>
            </li>
            <li css={exampleItemStyle}>
              <strong>GitHub PR:</strong>
              <code>https://github.com/org/repo/pull/{"{selText}"}</code>
            </li>
            <li css={exampleItemStyle}>
              <strong>Google検索:</strong>
              <code>https://www.google.com/search?q={"{selText}"}</code>
            </li>
          </ul>
          <p>
            <strong>注意:</strong> URLテンプレートには必ず
            <code>{"{selText}"}</code>
            を含めてください。http/httpsのURLのみ対応しています。
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            id="actionName"
            value={actionName}
            onChange={setActionName}
            label="アクション名 *"
            placeholder="例: Jira Issue"
            required
            error={errors.name}
          />

          <div css={inputGroupStyle}>
            <div css={inputGroupInputStyle}>
              <Input
                id="urlTemplate"
                value={urlTemplate}
                onChange={setUrlTemplate}
                label="URLテンプレート *"
                placeholder="例: https://jira.example.com/browse/PROJECT-{selText}"
                required
                error={errors.url}
              />
            </div>
            <Button variant="secondary" size="small" onClick={insertSelText}>
              置換文字列を挿入
            </Button>
          </div>

          <Button type="submit" variant="primary">
            アクションを追加
          </Button>
        </form>

        {successMessage && <div css={successStyle}>{successMessage}</div>}

        <div css={actionsListStyle}>
          <h3>登録済みアクション</h3>
          {actions.length === 0 ? (
            <p css={emptyMessageStyle}>登録されたアクションがありません</p>
          ) : (
            actions.map((action, index) => (
              <div key={action.id} css={actionItemStyle}>
                <div css={actionControlsStyle}>
                  {index > 0 && (
                    <span
                      css={dragHandleStyle}
                      onClick={() => moveAction(index, index - 1)}
                    >
                      ↑
                    </span>
                  )}
                  {index < actions.length - 1 && (
                    <span
                      css={dragHandleStyle}
                      onClick={() => moveAction(index, index + 1)}
                    >
                      ↓
                    </span>
                  )}
                  <Button
                    variant="danger"
                    onClick={() => deleteAction(action.id)}
                  >
                    削除
                  </Button>
                </div>
                <div css={actionNameStyle}>{escapeHtml(action.name)}</div>
                <div css={actionUrlStyle}>{escapeHtml(action.urlTemplate)}</div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default Options;
