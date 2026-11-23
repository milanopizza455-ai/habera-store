import React from 'react';

interface BrandMarkProps {
  variant?: 'dark' | 'light';
  compact?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ variant = 'dark', compact = false }) => {
  const strokeColor = variant === 'light' ? '#FAF7F1' : '#101010';
  const textColor = variant === 'light' ? 'text-[#FAF7F1]' : 'text-[#101010]';

  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 select-none">
      <svg
        width={compact ? 24 : 28}
        height={compact ? 24 : 28}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="2" y="2" width="32" height="32" rx="1" stroke="#C6A15B" strokeWidth="1.25" />
        <path
          d="M11 9V27M25 9V27M11 18H25"
          stroke={strokeColor}
          strokeWidth="1.75"
          strokeLinecap="square"
        />
        <path
          d="M15 9C16.5 7 19.5 7 21 9"
          stroke="#C6A15B"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
      <span
        className={`font-display text-xl sm:text-2xl font-semibold tracking-[0.2em] uppercase ${textColor}`}
      >
        HABERA
      </span>
    </span>
  );
};
