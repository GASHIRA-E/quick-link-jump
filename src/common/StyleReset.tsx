import { Global, css } from "@emotion/react";

export const StyleReset = () => (
  <Global
    styles={css`
      /* 全要素のbox-sizingをborder-boxに */
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      /* ブロック要素のマージンとパディングをリセット */
      body,
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      ul,
      ol,
      li,
      figure,
      dl,
      dd {
        margin: 0;
        padding: 0;
      }
      /* List styleも消すなら（任意） */
      ul,
      ol {
        list-style: none;
      }
    `}
  />
);
