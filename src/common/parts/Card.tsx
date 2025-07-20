/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

interface CardProps {
  children: React.ReactNode;
  padding?: "small" | "medium" | "large";
  shadow?: boolean;
  background?: string;
  borderRadius?: string;
}

const cardStyles = (
  padding: string,
  shadow: boolean,
  background: string,
  borderRadius: string
) => css`
  background: ${background};
  border-radius: ${borderRadius};
  padding: ${padding === "small"
    ? "15px"
    : padding === "large"
    ? "40px"
    : "30px"};
  ${shadow &&
  `
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  `}
`;

const Card: React.FC<CardProps> = ({
  children,
  padding = "medium",
  shadow = true,
  background = "white",
  borderRadius = "8px",
}) => {
  return (
    <div css={cardStyles(padding, shadow, background, borderRadius)}>
      {children}
    </div>
  );
};

export default Card;
