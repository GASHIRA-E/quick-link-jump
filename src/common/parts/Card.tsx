/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { CARD_PADDINGS, BORDERS, COLORS } from "@/common/styles";

interface CardProps {
  children: React.ReactNode;
  padding?: "small" | "medium" | "large";
  shadow?: boolean;
  background?: string;
  borderRadius?: string;
}

// パディングの型安全な定義
const paddingMap = {
  small: CARD_PADDINGS.small,
  medium: CARD_PADDINGS.medium,
  large: CARD_PADDINGS.large
} as const;

const cardStyles = (
  padding: keyof typeof paddingMap,
  shadow: boolean,
  background: string,
  borderRadius: string
) => css`
  background: ${background};
  border-radius: ${borderRadius};
  padding: ${paddingMap[padding]};
  ${shadow &&
  css`
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  `}
`;

export const Card: React.FC<CardProps> = ({
  children,
  padding = "medium",
  shadow = true,
  background = COLORS.white,
  borderRadius = BORDERS.radius.md,
}) => {
  return (
    <div css={cardStyles(padding, shadow, background, borderRadius)}>
      {children}
    </div>
  );
};
