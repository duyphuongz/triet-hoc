export function DeadlineMonster({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 260 220" role="img" aria-label="Quái vật deadline">
      <path d="M64 157c-4-47 23-88 68-88s72 41 64 88c-4 25-31 40-66 40-34 0-62-15-66-40Z" fill="#FF7A6B" stroke="#202124" strokeWidth="4" />
      <path d="M82 78 66 46M176 78l18-32" stroke="#202124" strokeWidth="6" strokeLinecap="round" />
      <circle cx="105" cy="125" r="16" fill="#fff" stroke="#202124" strokeWidth="4" />
      <circle cx="155" cy="125" r="16" fill="#fff" stroke="#202124" strokeWidth="4" />
      <circle cx="110" cy="128" r="5" fill="#202124" />
      <circle cx="150" cy="128" r="5" fill="#202124" />
      <path d="M103 161c16 12 38 12 54 0" fill="none" stroke="#202124" strokeWidth="4" strokeLinecap="round" />
      <rect x="66" y="31" width="56" height="28" rx="8" fill="#FFE66D" stroke="#202124" strokeWidth="4" />
      <text x="76" y="51" fontSize="16" fontWeight="900" fill="#202124">DUE</text>
      <path d="M196 51h30v62h-30z" fill="#fff" stroke="#202124" strokeWidth="4" />
      <path d="M202 68h18M202 83h18M202 98h12" stroke="#2EC4B6" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
