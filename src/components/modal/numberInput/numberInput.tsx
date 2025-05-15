import "./numberInput.scss";
export default function NumberInput({
  label,
  value,
  onChange,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength: number;
}) {
  return (
    <div className="number-input">
      <label className="numberInput-label">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="numberInput-modal"
      />
    </div>
  );
}
