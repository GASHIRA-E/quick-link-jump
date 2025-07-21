/** @jsxImportSource @emotion/react */
import { forwardRef } from "react";
import { css } from "@emotion/react";
import { COLORS, FONTS, SPACING, BORDERS } from "@/common/styles";

interface InputProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  label?: string;
  type?: "text" | "email" | "password";
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
  pattern?: string;
  actionButton?: React.ReactNode;
}

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

const inputContainerStyle = css`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Input = forwardRef<
  HTMLInputElement,
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
>(
  (
    {
      id,
      required = false,
      error,
      label,
      type = "text",
      disabled = false,
      actionButton,
      ...rest
    },
    ref
  ) => {
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div>
        {label && (
          <label htmlFor={id} css={labelStyle}>
            {label}
            {required && <span css={requiredStyle}>*</span>}
          </label>
        )}
        <div css={inputContainerStyle}>
          <input
            ref={ref}
            id={id}
            type={type}
            required={required}
            disabled={disabled}
            aria-describedby={errorId}
            aria-invalid={!!error}
            {...rest}
            css={inputStyle}
          />
          {actionButton}
        </div>
        {error && (
          <div id={errorId} css={errorStyle} role="alert">
            {error}
          </div>
        )}
      </div>
    );
  }
);
