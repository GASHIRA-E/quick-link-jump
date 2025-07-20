/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

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
  margin-bottom: 20px;
`;

const labelStyle = css`
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #555;
  font-size: 14px;
`;

const inputStyle = css`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  box-sizing: border-box;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const errorStyle = css`
  color: #dc3545;
  font-size: 12px;
  margin-top: 5px;
`;

const Input: React.FC<InputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  label,
  type = "text",
  disabled = false,
}) => {
  return (
    <div css={inputContainerStyle}>
      {label && (
        <label htmlFor={id} css={labelStyle}>
          {label}
        </label>
      )}
      <input
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
};

export default Input;
