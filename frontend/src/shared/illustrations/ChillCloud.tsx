export function ChillCloud({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 260 220" role="img" aria-label="Đám mây chill">
      <path d="M74 150c-19 0-34-14-34-31 0-16 13-29 30-31 7-24 31-40 58-36 22 3 39 18 45 38h8c22 0 39 15 39 34s-17 34-39 34H74Z" fill="#B8F2D0" stroke="#202124" strokeWidth="4" />
      <path d="M93 118c8 7 20 7 28 0M145 118c8 7 20 7 28 0" fill="none" stroke="#202124" strokeWidth="4" strokeLinecap="round" />
      <path d="M113 140c14 10 34 10 48 0" fill="none" stroke="#202124" strokeWidth="4" strokeLinecap="round" />
      <rect x="56" y="160" width="52" height="26" rx="8" fill="#FFE66D" stroke="#202124" strokeWidth="4" />
      <text x="68" y="178" fontSize="14" fontWeight="900" fill="#202124">ít drama</text>
      <path d="M190 47c6 11 6 22 0 33M210 58c5 8 5 16 0 24" stroke="#FF7A6B" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
