import { formatKoreanAmount } from "@/lib/format";

export function MoneyInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const numericValue = Number(value);
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <div className="input-with-unit">
        <input
          id={id}
          name={id}
          aria-label={label}
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="0"
        />
        <span>원</span>
      </div>
      {value !== "" && Number.isFinite(numericValue) ? (
        <small>{formatKoreanAmount(numericValue)}</small>
      ) : null}
    </label>
  );
}

export function RateInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="field" htmlFor={id}>
      <span>{label}</span>
      <div className="input-with-unit">
        <input
          id={id}
          name={id}
          aria-label={label}
          type="number"
          inputMode="decimal"
          step="0.01"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="0.00"
        />
        <span>%</span>
      </div>
    </label>
  );
}
