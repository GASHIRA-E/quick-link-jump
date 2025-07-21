/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ActionItem } from "./ActionItem";

interface Action {
  id: string;
  name: string;
  urlTemplate: string;
}

interface ActionsListProps {
  actions: Action[];
  onDelete: (id: string) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

const actionsListStyle = css`
  margin-top: 30px;
`;

const emptyMessageStyle = css`
  color: #666;
  text-align: center;
`;

const actionsContainerStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ActionsList: React.FC<ActionsListProps> = ({
  actions,
  onDelete,
  onMove,
}) => {
  return (
    <div css={actionsListStyle}>
      <h3>登録済みアクション</h3>
      {actions.length === 0 ? (
        <p css={emptyMessageStyle}>登録されたアクションがありません</p>
      ) : (
        <div css={actionsContainerStyle}>
          {actions.map((action, index) => (
            <ActionItem
              key={action.id}
              action={action}
              index={index}
              totalActions={actions.length}
              onDelete={onDelete}
              onMove={onMove}
            />
          ))}
        </div>
      )}
    </div>
  );
};
