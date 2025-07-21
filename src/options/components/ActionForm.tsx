/** @jsxImportSource @emotion/react */
import React, { forwardRef } from "react";
import { css } from "@emotion/react";
import { Button } from "@/common/parts/Button";
import { Input } from "@/common/parts/Input";

interface ActionFormProps {
  actionName: string;
  urlTemplate: string;
  errors: { [key: string]: string };
  onActionNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUrlTemplateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onInsertSelText: () => void;
}

const formStyle = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const insertButtonStyle = css`
  white-space: nowrap;
`;

export const ActionForm = forwardRef<HTMLInputElement, ActionFormProps>(
  (
    {
      actionName,
      urlTemplate,
      errors,
      onActionNameChange,
      onUrlTemplateChange,
      onSubmit,
      onInsertSelText,
    },
    ref
  ) => {
    return (
      <form onSubmit={onSubmit} css={formStyle}>
        <Input
          id="actionName"
          value={actionName}
          onChange={onActionNameChange}
          label="アクション名"
          placeholder="例: Jira Issue"
          required
          error={errors.name}
        />

        <Input
          ref={ref}
          id="urlTemplate"
          value={urlTemplate}
          onChange={onUrlTemplateChange}
          label="URLテンプレート"
          placeholder="例: https://jira.example.com/browse/PROJECT-{selText}"
          required
          error={errors.url}
          actionButton={
            <Button
              css={insertButtonStyle}
              variant="secondary"
              size="small"
              onClick={onInsertSelText}
            >
              置換文字列を挿入
            </Button>
          }
        />

        <div>
          <Button type="submit" variant="primary">
            アクションを追加
          </Button>
        </div>
      </form>
    );
  }
);
