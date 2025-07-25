/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Button } from "@/common/parts/Button";
import { StyleReset } from "@/common/StyleReset";

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

const infoStyle = css`
  font-size: 12px;
  color: #666;
  text-align: center;
  margin-top: 15px;
  line-height: 1.4;
`;

export const Popup: React.FC = () => {
  const handleOpenOptions = () => {
    try {
      if (chrome?.runtime?.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        console.error("Chrome extension API が利用できません");
      }
    } catch (error) {
      console.error("設定ページを開けませんでした:", error);
    }
  };

  return (
    <div css={containerStyle}>
      <StyleReset />
      <h1 css={titleStyle}>Quick Link Jump</h1>

      <Button
        variant="primary"
        size="large"
        fullWidth
        onClick={handleOpenOptions}
      >
        ⚙️ 設定を開く
      </Button>

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
