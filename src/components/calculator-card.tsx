import Link from "next/link";

const icons = {
  home: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 10.8 12 3l9 7.8" />
      <path d="M5.5 9.5V21h13V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </svg>
  ),
  calculator: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8" />
      <path d="M8 11h2" />
      <path d="M12 11h2" />
      <path d="M16 11h.01" />
      <path d="M8 15h2" />
      <path d="M12 15h2" />
      <path d="M16 15h.01" />
    </svg>
  ),
  compare: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4v16" />
      <path d="M17 4v16" />
      <path d="M4 8h6" />
      <path d="M14 16h6" />
      <path d="m8 6 2 2-2 2" />
      <path d="m16 14-2 2 2 2" />
    </svg>
  ),
};

export type CalculatorCardIcon = keyof typeof icons;

export function CalculatorCard({
  index,
  title,
  description,
  href,
  icon,
  iconLabel,
}: {
  index: string;
  title: string;
  description: string;
  href: string;
  icon: CalculatorCardIcon;
  iconLabel: string;
}) {
  return (
    <Link className="calculator-card" data-clickable="true" href={href}>
      <span className="calculator-card-topline">
        <span className="calculator-card-icon" role="img" aria-label={iconLabel}>{icons[icon]}</span>
        <span className="calculator-card-index">{index}</span>
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="text-link">계산하기 →</span>
      <span className="card-click-cue" aria-hidden="true">›</span>
    </Link>
  );
}
