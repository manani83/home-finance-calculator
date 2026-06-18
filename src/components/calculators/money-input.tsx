import { formatKoreanAmount } from "@/lib/format";

const moneyPresets = [
  { label: "+1천만", amount: 10_000_000 },
  { label: "+5천만", amount: 50_000_000 },
  { label: "+1억", amount: 100_000_000 },
];

function normalizeNumericInput(input: string, allowDecimal: boolean): string {
  const withoutSeparators = input.replaceAll(",", "");
  const sign = withoutSeparators.startsWith("-") ? "-" : "";
  const unsigned = withoutSeparators.replaceAll("-", "");

  if (!allowDecimal) {
    return `${sign}${unsigned.replace(/\D/g, "")}`;
  }

  const decimalIndex = unsigned.indexOf(".");
  const integerPart = (decimalIndex === -1 ? unsigned : unsigned.slice(0, decimalIndex)).replace(/\D/g, "");
  const decimalPart = decimalIndex === -1 ? "" : unsigned.slice(decimalIndex + 1).replace(/\D/g, "");
  return `${sign}${integerPart}${decimalIndex === -1 ? "" : `.${decimalPart}`}`;
}

function formatNumericInput(value: string): string {
  const sign = value.startsWith("-") ? "-" : "";
  const unsigned = sign ? value.slice(1) : value;
  const [integerPart, decimalPart] = unsigned.split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${sign}${formattedInteger}${unsigned.includes(".") ? `.${decimalPart ?? ""}` : ""}`;
}

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
  const addPresetAmount = (amount: number) => {
    const currentValue = Number.isFinite(numericValue) ? numericValue : 0;
    onChange(String(currentValue + amount));
  };

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="input-with-unit">
        <input
          id={id}
          name={id}
          aria-label={label}
          type="text"
          inputMode="numeric"
          value={formatNumericInput(value)}
          onChange={(event) => onChange(normalizeNumericInput(event.target.value, false))}
          placeholder="0"
        />
        <span>원</span>
      </div>
      {value !== "" && Number.isFinite(numericValue) ? (
        <small>{formatKoreanAmount(numericValue)}</small>
      ) : null}
      <div className="preset-group money-preset-group" aria-label={`${label} 빠른 입력`}>
        {moneyPresets.map((preset) => (
          <button key={preset.label} type="button" onClick={() => addPresetAmount(preset.amount)}>
            {preset.label}
          </button>
        ))}
        <button type="button" onClick={() => onChange("")}>초기화</button>
      </div>
    </div>
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
          type="text"
          inputMode="decimal"
          value={formatNumericInput(value)}
          onChange={(event) => onChange(normalizeNumericInput(event.target.value, true))}
          placeholder="0.00"
        />
        <span>%</span>
      </div>
    </label>
  );
}
