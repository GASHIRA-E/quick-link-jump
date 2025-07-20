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
  autoComplete?: string;
  maxLength?: number;
  pattern?: string;
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

const requiredStyle = css`
  color: ${COLORS.danger};
  margin-left: ${SPACING.xs};
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

  &[aria-invalid="true"] {
    border-color: ${COLORS.danger};
  }
`;

const errorStyle = css`
  color: ${COLORS.danger};
  font-size: ${FONTS.sizes.xs};
  margin-top: ${SPACING.xs};
`;

export const Input = forwardRef<
  HTMLInputElement,
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
>(
  (
    {
      id,
      value,
      onChange,
      placeholder,
      required = false,
      error,
      label,
      type = "text",
      disabled = false,
      autoComplete,
      maxLength,
      pattern,
      ...rest
    },
    ref
  ) => {
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div css={inputContainerStyle}>
        {label && (
          <label htmlFor={id} css={labelStyle}>
            {label}
            {required && <span css={requiredStyle}>*</span>}
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
          autoComplete={autoComplete}
          maxLength={maxLength}
          pattern={pattern}
          aria-describedby={errorId}
          aria-invalid={!!error}
          {...rest}
          css={inputStyle}
        />
        {error && (
          <div id={errorId} css={errorStyle} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);
