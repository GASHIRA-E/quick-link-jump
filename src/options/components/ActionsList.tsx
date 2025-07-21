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

const titleStyle = css`
  margin-bottom: 10px;
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
    <div>
      <h3 css={titleStyle}>登録済みアクション</h3>
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
