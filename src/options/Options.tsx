/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import { css } from "@emotion/react";
import Card from "../common/parts/Card";
import ExampleSection from "./components/ExampleSection";
import ActionForm from "./components/ActionForm";
import ActionsList from "./components/ActionsList";

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

const successStyle = css`
  color: #28a745;
  font-size: 12px;
  margin-top: 5px;
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



  return (
    <div css={containerStyle}>
      <Card>
        <h1 css={titleStyle}>Quick Link Jump 設定</h1>

        <ExampleSection />

        <ActionForm
          actionName={actionName}
          urlTemplate={urlTemplate}
          errors={errors}
          onActionNameChange={setActionName}
          onUrlTemplateChange={setUrlTemplate}
          onSubmit={handleSubmit}
          onInsertSelText={insertSelText}
        />

        {successMessage && <div css={successStyle}>{successMessage}</div>}

        <ActionsList
          actions={actions}
          onDelete={deleteAction}
          onMove={moveAction}
        />
      </Card>
    </div>
  );
};

export default Options;
