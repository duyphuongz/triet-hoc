export function MeaningVoid({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 260 220" role="img" aria-label="Khoảng không ý nghĩa">
      <rect x="54" y="44" width="152" height="132" rx="8" fill="#202124" stroke="#202124" strokeWidth="4" />
      <path d="M74 73h112M74 99h76M74 126h98M74 152h53" stroke="#FFF9EF" strokeWidth="5" strokeLinecap="round" />
      <circle cx="178" cy="148" r="24" fill="#FFE66D" stroke="#202124" strokeWidth="4" />
      <path d="M167 145c5-8 17-8 22 0M171 158h15" stroke="#202124" strokeWidth="4" strokeLinecap="round" />
      <path d="M49 183c22 14 51 19 86 12" fill="none" stroke="#2EC4B6" strokeWidth="5" strokeLinecap="round" />
      <path d="M202 44c12 9 18 21 18 36" fill="none" stroke="#FF7A6B" strokeWidth="5" strokeLinecap="round" />
      <text x="88" y="38" fontSize="18" fontWeight="900" fill="#202124">ý nghĩa?</text>
    </svg>
  );
}
