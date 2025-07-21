/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { BUTTON_COLORS, BUTTON_SIZES } from "@/common/styles";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
  "aria-label"?: string;
}

// ボタンの色の型安全な定義
const colorMap = {
  primary: BUTTON_COLORS.primary,
  secondary: BUTTON_COLORS.secondary,
  danger: BUTTON_COLORS.danger,
} as const;

// ボタンのサイズの型安全な定義
const sizeMap = {
  small: BUTTON_SIZES.small,
  medium: BUTTON_SIZES.medium,
  large: BUTTON_SIZES.large,
} as const;

const buttonStyles = (
  variant: keyof typeof colorMap,
  size: keyof typeof sizeMap,
  fullWidth: boolean
) => css`
  background: ${colorMap[variant].normal};
  color: white;
  border: none;
  padding: ${sizeMap[size].padding};
  border-radius: 4px;
  cursor: pointer;
  font-size: ${sizeMap[size].fontSize};
  transition: background-color 0.2s ease;
  width: ${fullWidth ? "100%" : "auto"};

  &:hover {
    background: ${colorMap[variant].hover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  variant = "primary",
  size = "medium",
  children,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
  "aria-label": ariaLabel,
  ...rest
}) => {
  return (
    <button
      css={buttonStyles(variant, size, fullWidth)}
      onClick={onClick}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  );
};
