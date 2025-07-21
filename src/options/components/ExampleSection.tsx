/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { Card } from "@/common/parts/Card";

const exampleCardStyle = css`
  border: 1px solid #b3d9ff;
`;

const exampleTitleStyle = css`
  margin-top: 0;
  color: #0066cc;
`;

const exampleListStyle = css`
  margin: 10px 0;
  padding-left: 20px;
  list-style: disc;
`;

const exampleItemStyle = css`
  margin-bottom: 5px;
`;

export const ExampleSection: React.FC = () => {
  return (
    <Card
      padding="small"
      shadow={false}
      background="#e7f3ff"
      borderRadius="4px"
      customCss={exampleCardStyle}
    >
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
    </Card>
  );
};
