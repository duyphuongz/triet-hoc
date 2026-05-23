export function SocietyPyramid({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 260 220" role="img" aria-label="Kim tự tháp xã hội">
      <path d="M130 35 226 184H34L130 35Z" fill="#FFE66D" stroke="#202124" strokeWidth="4" />
      <path d="M82 110h96M58 147h144M130 35v149" stroke="#202124" strokeWidth="4" />
      <circle cx="103" cy="131" r="12" fill="#FF7A6B" stroke="#202124" strokeWidth="4" />
      <circle cx="157" cy="131" r="12" fill="#2EC4B6" stroke="#202124" strokeWidth="4" />
      <circle cx="130" cy="84" r="12" fill="#fff" stroke="#202124" strokeWidth="4" />
      <path d="M70 190h120" stroke="#202124" strokeWidth="6" strokeLinecap="round" />
      <path d="M42 61c16 3 25 11 28 26" fill="none" stroke="#6B5DD3" strokeWidth="5" strokeLinecap="round" />
      <path d="M218 73c-14 5-22 15-24 29" fill="none" stroke="#FF7A6B" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
