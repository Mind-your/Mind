import "../../assets/styles/logincadastro/main_login_cadastro.css";

function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  autoComplete,
  onBlur,
  readOnly = false,
  extraContent,
  min,
  max
}) {
  return (
    <div className={`input ${required ? "input-obrigatorio" : ""} ${value ? "preenchido" : ""}`}>
      <label>{label}</label>

      <div style={{ position: "relative" }}>
        <input 
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={error ? "error" : ""}
          onBlur={onBlur}
          readOnly={readOnly}
          min={min}
          max={max}
        />

        {extraContent}
      </div>

      {error && <span className="error-text">{error}</span>}
    </div>
  );
}

export default InputField;