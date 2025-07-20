/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import Button from "../../common/parts/Button";
import Input from "../../common/parts/Input";

interface ActionFormProps {
  actionName: string;
  urlTemplate: string;
  errors: { [key: string]: string };
  onActionNameChange: (value: string) => void;
  onUrlTemplateChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onInsertSelText: () => void;
}

const inputGroupStyle = css`
  display: flex;
  gap: 10px;
  align-items: flex-end;
`;

const inputGroupInputStyle = css`
  flex: 1;
`;

const ActionForm: React.FC<ActionFormProps> = ({
  actionName,
  urlTemplate,
  errors,
  onActionNameChange,
  onUrlTemplateChange,
  onSubmit,
  onInsertSelText,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <Input
        id="actionName"
        value={actionName}
        onChange={onActionNameChange}
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
            onChange={onUrlTemplateChange}
            label="URLテンプレート *"
            placeholder="例: https://jira.example.com/browse/PROJECT-{selText}"
            required
            error={errors.url}
          />
        </div>
        <Button variant="secondary" size="small" onClick={onInsertSelText}>
          置換文字列を挿入
        </Button>
      </div>

      <Button type="submit" variant="primary">
        アクションを追加
      </Button>
    </form>
  );
};

export default ActionForm;
