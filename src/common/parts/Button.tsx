/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { BUTTON_COLORS, BUTTON_SIZES } from "../styles";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
}

const buttonStyles = (variant: ButtonProps['variant'], size: ButtonProps['size'], fullWidth: boolean) => css`
  background: ${BUTTON_COLORS[variant || 'primary'].normal};
  color: white;
  border: none;
  padding: ${BUTTON_SIZES[size || 'medium'].padding};
  border-radius: 4px;
  cursor: pointer;
  font-size: ${BUTTON_SIZES[size || 'medium'].fontSize};
  transition: background-color 0.2s ease;
  width: ${fullWidth ? "100%" : "auto"};

  &:hover {
    background: ${BUTTON_COLORS[variant || 'primary'].hover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  children,
  onClick,
  type = "button",
  disabled = false,
  fullWidth = false,
}) => {
  return (
    <button
      css={buttonStyles(variant, size, fullWidth)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
