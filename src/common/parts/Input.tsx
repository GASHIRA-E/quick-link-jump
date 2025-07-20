/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import { css } from "@emotion/react";
import { COLORS, FONTS, SPACING, BORDERS } from "../styles";

interface InputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  label?: string;
  type?: "text" | "email" | "password";
  disabled?: boolean;
}

const inputContainerStyle = css`
  margin-bottom: ${SPACING.lg};
`;

const labelStyle = css`
  display: block;
  margin-bottom: ${SPACING.xs};
  font-weight: ${FONTS.weights.semibold};
  color: ${COLORS.gray[700]};
  font-size: ${FONTS.sizes.sm};
`;

const inputStyle = css`
  width: 100%;
  padding: ${SPACING.sm};
  border: ${BORDERS.width.thin} solid ${COLORS.gray[300]};
  border-radius: ${BORDERS.radius.sm};
  font-size: ${FONTS.sizes.sm};
  box-sizing: border-box;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${COLORS.primary};
  }

  &:disabled {
    background-color: ${COLORS.gray[100]};
    cursor: not-allowed;
  }
`;

const errorStyle = css`
  color: ${COLORS.danger};
  font-size: ${FONTS.sizes.xs};
  margin-top: ${SPACING.xs};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  id,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  label,
  type = "text",
  disabled = false,
}, ref) => {
  return (
    <div css={inputContainerStyle}>
      {label && (
        <label htmlFor={id} css={labelStyle}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        css={inputStyle}
      />
      {error && <div css={errorStyle}>{error}</div>}
    </div>
  );
});
