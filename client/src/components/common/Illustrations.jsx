export function HeroIllustration() {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 500, height: "auto" }}>
      <defs>
        <linearGradient id="hg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="hg2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
        <linearGradient id="hg3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#2DD4BF" />
        </linearGradient>
      </defs>
      {/* Background decorative circles */}
      <circle cx="250" cy="200" r="180" fill="rgba(99,102,241,0.05)" />
      <circle cx="250" cy="200" r="120" fill="rgba(99,102,241,0.08)" />
      {/* Main card */}
      <rect x="80" y="80" width="340" height="240" rx="20" fill="#13182B" stroke="rgba(99,102,241,0.2)" strokeWidth="2" />
      {/* Card header */}
      <rect x="110" y="105" width="60" height="60" rx="12" fill="url(#hg1)" />
      <rect x="185" y="110" width="140" height="12" rx="6" fill="#1E293B" />
      <rect x="185" y="130" width="90" height="8" rx="4" fill="#1E293B" />
      <rect x="310" y="108" width="80" height="28" rx="14" fill="rgba(99,102,241,0.15)" />
      {/* Card body */}
      <rect x="110" y="180" width="280" height="8" rx="4" fill="#1E293B" />
      <rect x="110" y="196" width="240" height="8" rx="4" fill="#1E293B" />
      <rect x="110" y="212" width="200" height="8" rx="4" fill="#1E293B" />
      {/* Tags */}
      <rect x="110" y="235" width="60" height="24" rx="8" fill="rgba(99,102,241,0.1)" />
      <rect x="180" y="235" width="70" height="24" rx="8" fill="rgba(20,184,166,0.1)" />
      <rect x="260" y="235" width="50" height="24" rx="8" fill="rgba(236,72,153,0.1)" />
      {/* Apply button */}
      <rect x="110" y="275" width="280" height="36" rx="10" fill="url(#hg1)" opacity="0.9" />
      {/* Floating elements */}
      <rect x="30" y="150" width="40" height="40" rx="10" fill="url(#hg2)" opacity="0.6" />
      <rect x="430" y="90" width="35" height="35" rx="8" fill="url(#hg3)" opacity="0.6" />
      <circle cx="60" cy="330" r="20" fill="url(#hg1)" opacity="0.4" />
      <circle cx="440" cy="340" r="25" fill="url(#hg2)" opacity="0.3" />
    </svg>
  );
}

export function EmptyStateIllustration() {
  return (
    <svg viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 120, height: 96 }}>
      <circle cx="100" cy="60" r="45" stroke="rgba(99,102,241,0.2)" strokeWidth="3" fill="none" />
      <circle cx="100" cy="60" r="30" stroke="rgba(99,102,241,0.15)" strokeWidth="3" fill="none" />
      <circle cx="100" cy="60" r="15" stroke="rgba(99,102,241,0.1)" strokeWidth="3" fill="none" />
      <path d="M70 130 L100 105 L130 130" stroke="rgba(99,102,241,0.3)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M75 30 L100 55 L125 30" stroke="rgba(236,72,153,0.3)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="100" cy="60" r="4" fill="#6366F1" opacity="0.5" />
    </svg>
  );
}

export function SuccessIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 100, height: 100 }}>
      <circle cx="60" cy="60" r="55" fill="rgba(20,184,166,0.08)" />
      <circle cx="60" cy="60" r="40" fill="rgba(20,184,166,0.05)" />
      <path d="M40 60 L54 74 L80 48" stroke="#14B8A6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ErrorIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 100, height: 100 }}>
      <circle cx="60" cy="60" r="55" fill="rgba(239,68,68,0.08)" />
      <circle cx="60" cy="60" r="40" fill="rgba(239,68,68,0.05)" />
      <path d="M45 45 L75 75 M75 45 L45 75" stroke="#EF4444" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

export function LoadingSpinner() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 40, height: 40 }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <g style={{ animation: "spin 1.5s linear infinite", transformOrigin: "center" }}>
        <circle cx="20" cy="20" r="16" stroke="rgba(99,102,241,0.15)" strokeWidth="4" fill="none" />
        <path d="M20 4 A16 16 0 0 1 36 20" stroke="url(#lsg)" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>
      <defs>
        <linearGradient id="lsg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function DashboardBg() {
  return (
    <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0, opacity: 0.03 }}>
      <defs>
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="#6366F1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)" />
    </svg>
  );
}
