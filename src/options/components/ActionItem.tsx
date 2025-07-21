/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Button } from "@/common/parts/Button";

interface Action {
  id: string;
  name: string;
  urlTemplate: string;
}

interface ActionItemProps {
  action: Action;
  index: number;
  totalActions: number;
  onDelete: (id: string) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
}

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

export const ActionItem: React.FC<ActionItemProps> = ({
  action,
  index,
  totalActions,
  onDelete,
  onMove,
}) => {
  return (
    <div css={actionItemStyle}>
      <div css={actionControlsStyle}>
        {index > 0 && (
          <span css={dragHandleStyle} onClick={() => onMove(index, index - 1)}>
            ↑
          </span>
        )}
        {index < totalActions - 1 && (
          <span css={dragHandleStyle} onClick={() => onMove(index, index + 1)}>
            ↓
          </span>
        )}
        <Button variant="danger" onClick={() => onDelete(action.id)}>
          削除
        </Button>
      </div>
      <div css={actionNameStyle}>{action.name}</div>
      <div css={actionUrlStyle}>{action.urlTemplate}</div>
    </div>
  );
};
