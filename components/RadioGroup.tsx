interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  legend: string;
  options: RadioOption[];
  selected?: string; 
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioGroup({ name, legend, options, selected, onChange, }: RadioGroupProps) {
  return (
    <fieldset className="contactsections">
      <legend>{legend}</legend>
      <div>
        {options.map((option, index) => (
          <label key={index} className="radio-label">
            <input type="radio" name={name} value={option.value} checked={selected === option.value} onChange={onChange} required />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
