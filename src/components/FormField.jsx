import React from "react";

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
  error,
}) {
  return (
    <div className="flede">
      {label && (
        <label htmlFor={name}>
          {label}
          <span className="required">*</span>
        </label>
      )}

      <input
        type={type}
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
}