// components/TextareaField.tsx
interface TextareaFieldProps {
  name?: string;
  placeholder: string;
  value: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  className?: string;
}

export default function TextareaField({
  name,
  placeholder,
  value,
  error,
  onChange,
  onBlur,
  className = "",
}: TextareaFieldProps) {
  return (
    <>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`inputform formtextarea ${className} ${error ? "input-error" : ""}`}
        minLength={10}
        required
      />
      {error && <span className="error-message">{error}</span>}
    </>
  );
}
