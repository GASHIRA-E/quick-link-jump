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
  border-radius: 8px;
  padding: 12px;
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 12px;
  align-items: center;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-color: #dee2e6;
  }
`;

const contentStyle = css`
  min-width: 0; // gridでのテキストオーバーフロー対策
`;

const actionNameStyle = css`
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
  font-size: 14px;
`;

const actionUrlStyle = css`
  color: #666;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
  font-size: 11px;
  word-break: break-all;
  line-height: 1.3;
  background: #f1f3f4;
  padding: 4px 8px;
  border-radius: 3px;
  border: 1px solid #e1e5e9;
`;

const moveButtonsStyle = css`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const moveButtonStyle = css`
  background: none;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  padding: 4px 6px;
  cursor: pointer;
  color: #6c757d;
  font-size: 10px;
  transition: all 0.2s ease;
  min-width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e9ecef;
    border-color: #adb5bd;
    color: #495057;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 1px;
  }
`;

const deleteButtonStyle = css`
  min-width: 50px;
  font-size: 11px;
  padding: 4px 8px;
`;

export const ActionItem: React.FC<ActionItemProps> = ({
  action,
  index,
  totalActions,
  onDelete,
  onMove,
}) => {
  const handleMoveUp = () => onMove(index, index - 1);
  const handleMoveDown = () => onMove(index, index + 1);
  const handleDelete = () => onDelete(action.id);

  return (
    <div css={actionItemStyle}>
      <div css={contentStyle}>
        <div css={actionNameStyle}>{action.name}</div>
        <div css={actionUrlStyle}>{action.urlTemplate}</div>
      </div>
      
      <div css={moveButtonsStyle}>
        <button
          css={moveButtonStyle}
          onClick={handleMoveUp}
          disabled={index === 0}
          aria-label={`${action.name}を上に移動`}
          title="上に移動"
        >
          ↑
        </button>
        
        <button
          css={moveButtonStyle}
          onClick={handleMoveDown}
          disabled={index === totalActions - 1}
          aria-label={`${action.name}を下に移動`}
          title="下に移動"
        >
          ↓
        </button>
      </div>
      
      <Button
        variant="danger"
        size="small"
        onClick={handleDelete}
        css={deleteButtonStyle}
        aria-label={`${action.name}を削除`}
      >
        削除
      </Button>
    </div>
  );
};
