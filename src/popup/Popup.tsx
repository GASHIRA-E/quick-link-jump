/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const containerStyle = css`
  width: 300px;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  margin: 0;
  background-color: #f8f9fa;
`;

const titleStyle = css`
  color: #333;
  margin: 0 0 20px 0;
  font-size: 18px;
  text-align: center;
`;

const buttonStyle = (variant: "primary" | "secondary" = "primary") => css`
  background: ${variant === "secondary" ? "#6c757d" : "#007bff"};
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  margin-bottom: 10px;
  transition: background-color 0.2s;

  &:hover {
    background: ${variant === "secondary" ? "#545b62" : "#0056b3"};
  }
`;

const infoStyle = css`
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 15px;
  line-height: 1.4;
`;

const Popup: React.FC = () => {
  const handleOpenOptions = () => {
    chrome.runtime.openOptionsPage();
  };

  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>Quick Link Jump</h1>

      <button css={buttonStyle()} onClick={handleOpenOptions}>
        ⚙️ 設定を開く
      </button>

      <div css={infoStyle}>
        <strong>使い方:</strong>
        <br />
        1. テキストを選択
        <br />
        2. 右クリック
        <br />
        3. コンテキストメニューからアクションを選択
      </div>
    </div>
  );
};

export default Popup;
