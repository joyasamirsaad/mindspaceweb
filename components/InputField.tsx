interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  className?: string;
}

export default function InputField({
  type,
  name,
  placeholder,
  value,
  error,
  onChange,
  onBlur,
  className = "",
}: InputFieldProps) {
  return (
    <>
      <input
        className={`inputform ${className} ${error ? "input-error" : ""}`}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <span className="error-message">{error}</span>}
    </>
  );
}
