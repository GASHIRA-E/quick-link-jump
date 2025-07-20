/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
}

const buttonStyles = (variant: string, size: string, fullWidth: boolean) => css`
  background: ${variant === "secondary"
    ? "#6c757d"
    : variant === "danger"
    ? "#dc3545"
    : "#007bff"};
  color: white;
  border: none;
  padding: ${size === "small"
    ? "8px 12px"
    : size === "large"
    ? "12px 24px"
    : "10px 20px"};
  border-radius: 4px;
  cursor: pointer;
  font-size: ${size === "small" ? "12px" : size === "large" ? "16px" : "14px"};
  transition: background-color 0.2s ease;
  width: ${fullWidth ? "100%" : "auto"};
  margin-right: ${fullWidth ? "0" : "10px"};
  margin-bottom: ${fullWidth ? "10px" : "0"};

  &:hover {
    background: ${variant === "secondary"
      ? "#5a6268"
      : variant === "danger"
      ? "#c82333"
      : "#0056b3"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const Button: React.FC<ButtonProps> = ({
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

export default Button;
