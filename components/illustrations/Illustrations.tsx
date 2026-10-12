import React from 'react';

// Hero illustration of two characters collaborating / tending growth (from Reference 1)
export function HeroTendingIllustration({ className = "w-48 h-32" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E9E7F2" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8A7CC8" />
          <stop offset="100%" stopColor="#6255A5" />
        </linearGradient>
        <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7DCE5" />
          <stop offset="100%" stopColor="#F3AFA5" />
        </linearGradient>
      </defs>
      {/* Soft background aura */}
      <ellipse cx="120" cy="115" rx="100" ry="22" fill="url(#heroGlow)" />
      
      {/* Left Character (kneeling, tending) */}
      <circle cx="58" cy="46" r="14" fill="#38304F" />
      <ellipse cx="58" cy="42" r="11" fill="#F7DCE5" />
      {/* Hair */}
      <path d="M47 43C47 35 53 32 60 32C68 32 71 37 70 45C66 42 61 41 57 43C53 45 49 45 47 43Z" fill="#38304F" />
      {/* Torso & Robe */}
      <path d="M58 56C46 62 40 75 38 98C46 102 68 102 76 96C74 80 70 66 58 56Z" fill="#DCEAFF" />
      <path d="M50 72C56 78 66 84 76 86L68 98C58 98 44 98 38 98C40 88 44 80 50 72Z" fill="url(#purpleGrad)" />
      {/* Arms reaching */}
      <path d="M56 68C65 74 76 85 86 92C84 94 80 95 76 94C68 88 60 80 52 74Z" fill="#F7DCE5" />
      
      {/* Center Plant & Pot */}
      <ellipse cx="118" cy="118" rx="22" ry="8" fill="#E9E8F0" />
      <path d="M108 112L112 122C113 124 123 124 124 122L128 112Z" fill="#C9C5DE" />
      {/* Sprout & Floral Sparkle */}
      <path d="M118 112C118 100 114 90 108 86C116 88 122 96 118 112Z" fill="#9CCDB7" />
      <path d="M118 104C122 96 128 92 134 94C128 98 124 104 118 104Z" fill="#9CCDB7" />
      <circle cx="118" cy="84" r="5" fill="#F3AFA5" />
      <circle cx="116" cy="82" r="2" fill="#FFFFFF" />

      {/* Right Character (kneeling with watering tool) */}
      <circle cx="178" cy="42" r="14" fill="#38304F" />
      <ellipse cx="176" cy="39" r="10" fill="#F7DCE5" />
      {/* Hair */}
      <path d="M166 38C166 30 172 28 180 28C188 28 190 34 188 42C184 39 178 38 174 40C170 42 168 41 166 38Z" fill="#38304F" />
      {/* Torso & Robe */}
      <path d="M176 52C188 58 196 72 198 96C190 100 168 100 160 94C162 78 166 64 176 52Z" fill="#DCEAFF" />
      <path d="M184 68C178 76 168 82 158 84L166 96C176 96 190 96 198 96C196 86 192 78 184 68Z" fill="url(#purpleGrad)" />
      {/* Arm holding watering can / tool */}
      <path d="M172 64C160 70 148 78 138 88C140 90 145 91 149 89C156 82 166 75 174 70Z" fill="#F7DCE5" />
      <rect x="130" y="86" width="14" height="9" rx="3" transform="rotate(-15 130 86)" fill="#6255A5" />
      <path d="M129 95L122 101" stroke="#6F91D5" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="120" cy="105" r="1.5" fill="#6F91D5" />
      <circle cx="123" cy="109" r="1.5" fill="#6F91D5" />
    </svg>
  );
}

// Umbrella Character (from bottom of Reference 1)
export function UmbrellaIllustration({ className = "w-36 h-36" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="umbrellaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7B6BBF" />
          <stop offset="100%" stopColor="#9C8EDB" />
        </linearGradient>
      </defs>
      {/* Umbrella Canopy */}
      <path d="M80 20C46 20 28 54 26 68C40 68 50 62 62 68C74 62 86 62 98 68C110 62 120 68 134 68C132 54 114 20 80 20Z" fill="url(#umbrellaGrad)" />
      {/* Umbrella Rib segments / scallops */}
      <path d="M26 68C32 64 42 64 48 68C54 64 64 64 70 68C76 64 86 64 92 68C98 64 108 64 114 68C120 64 130 64 134 68L130 76C124 73 118 73 112 76C106 73 98 73 92 76C86 73 78 73 72 76C66 73 58 73 52 76C46 73 38 73 32 76L26 68Z" fill="#F7DCE5" />
      
      {/* Pole and Handle */}
      <path d="M80 68V115C80 120 74 122 70 120" stroke="#38304F" strokeWidth="3" strokeLinecap="round" />
      
      {/* Character under umbrella */}
      <circle cx="88" cy="80" r="8" fill="#F7DCE5" />
      {/* Body / Coat */}
      <path d="M78 88C82 86 94 86 98 88L104 120C100 124 76 124 72 120L78 88Z" fill="#38304F" />
      {/* Legs & boots */}
      <rect x="80" y="120" width="4" height="15" fill="#38304F" rx="2" />
      <rect x="92" y="120" width="4" height="15" fill="#38304F" rx="2" />

      {/* Small plants on sides */}
      <path d="M50 135V125M47 127C52 127 53 123 53 123M50 128C46 128 47 124 47 124" stroke="#6255A5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="50" cy="122" r="3" fill="#F3AFA5" />
      
      <path d="M120 135V125M117 127C122 127 123 123 123 123M120 128C116 128 117 124 117 124" stroke="#6255A5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="120" cy="122" r="3" fill="#F3AFA5" />
    </svg>
  );
}

// Student Reading Book with Sparkles & Math Symbols (from Reference 3)
export function StudentLearningIllustration({ className = "w-44 h-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Floating Math Symbols */}
      <text x="50" y="38" fill="#6255A5" fontSize="16" fontWeight="bold" opacity="0.75">+</text>
      <text x="35" y="60" fill="#F3AFA5" fontSize="18" fontWeight="bold" opacity="0.75">÷</text>
      
      {/* Lightbulb / Idea bubble */}
      <g transform="translate(145, 20)">
        <path d="M15 5C10 5 6 9 6 14C6 17 8 20 10 22V25H20V22C22 20 24 17 24 14C24 9 20 5 15 5Z" fill="#F2C98A" opacity="0.9" />
        <line x1="12" y1="28" x2="18" y2="28" stroke="#38304F" strokeWidth="1.5" />
        {/* Rays */}
        <line x1="15" y1="1" x2="15" y2="3" stroke="#F2C98A" strokeWidth="2" strokeLinecap="round" />
        <line x1="3" y1="8" x2="5" y2="9" stroke="#F2C98A" strokeWidth="2" strokeLinecap="round" />
        <line x1="25" y1="8" x2="27" y2="9" stroke="#F2C98A" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Student Character */}
      {/* Head */}
      <circle cx="110" cy="46" r="16" fill="#38304F" />
      <ellipse cx="112" cy="48" r="13" fill="#F7DCE5" />
      {/* Hair */}
      <path d="M96 44C96 32 108 30 118 30C128 30 130 36 126 44C120 40 114 40 108 42C102 44 98 44 96 44Z" fill="#38304F" />
      {/* Face details */}
      <circle cx="116" cy="46" r="1.5" fill="#38304F" />
      <path d="M118 52C116 54 114 54 112 53" stroke="#38304F" strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Body / Shoulders */}
      <path d="M90 76C90 64 100 60 112 60C124 60 134 64 134 76L130 115H94L90 76Z" fill="#38304F" />
      
      {/* Open Book */}
      <g transform="translate(75, 70)">
        {/* Left page */}
        <path d="M38 12C28 10 12 12 5 18V45C12 40 28 38 38 40V12Z" fill="#FFFFFF" stroke="#E9E8F0" strokeWidth="1.5" />
        {/* Right page */}
        <path d="M38 12C48 10 64 12 71 18V45C64 40 48 38 38 40V12Z" fill="#FFFFFF" stroke="#E9E8F0" strokeWidth="1.5" />
        {/* Book spine line */}
        <line x1="38" y1="12" x2="38" y2="40" stroke="#C9C5DE" strokeWidth="2" />
        {/* Page text mock lines */}
        <line x1="12" y1="24" x2="30" y2="23" stroke="#DFDCEB" strokeWidth="2" strokeLinecap="round" />
        <line x1="12" y1="30" x2="26" y2="29" stroke="#DFDCEB" strokeWidth="2" strokeLinecap="round" />
        <line x1="46" y1="23" x2="64" y2="24" stroke="#DFDCEB" strokeWidth="2" strokeLinecap="round" />
        <line x1="46" y1="29" x2="60" y2="30" stroke="#DFDCEB" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// 3D Isometric Stack of Books (from Reference 2)
export function IsometricBooksIllustration({ className = "w-36 h-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="bookBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8DA8E4" />
          <stop offset="100%" stopColor="#4B6EB5" />
        </linearGradient>
        <linearGradient id="bookPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8A7CC8" />
          <stop offset="100%" stopColor="#6255A5" />
        </linearGradient>
        <linearGradient id="bookCoral" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7B2A8" />
          <stop offset="100%" stopColor="#E08B7F" />
        </linearGradient>
      </defs>

      {/* Bottom Book (Navy/Blue) */}
      <g transform="translate(10, 30)">
        <path d="M70 45L125 15L75 0L20 30L70 45Z" fill="url(#bookBlue)" />
        <path d="M20 30L70 45V55L20 40V30Z" fill="#3D5994" />
        <path d="M70 45L125 15V25L70 55V45Z" fill="#2E4370" />
      </g>

      {/* Middle Book (Coral) */}
      <g transform="translate(15, 18)">
        <path d="M70 42L120 15L73 0L23 27L70 42Z" fill="url(#bookCoral)" />
        <path d="M23 27L70 42V51L23 36V27Z" fill="#BF685C" />
        <path d="M70 42L120 15V24L70 51V42Z" fill="#A14F44" />
      </g>

      {/* Top Book / Tablet (Lavender-White with checkboxes) */}
      <g transform="translate(20, 4)">
        <path d="M68 40L115 15L70 0L23 25L68 40Z" fill="#FFFFFF" stroke="#E9E8F0" />
        <path d="M23 25L68 40V48L23 33V25Z" fill="#DCEAFF" />
        <path d="M68 40L115 15V23L68 48V40Z" fill="#C9C5DE" />
        
        {/* Little checkmarks on top sheet */}
        <circle cx="50" cy="22" r="3" fill="#6255A5" />
        <line x1="58" y1="20" x2="85" y2="10" stroke="#DFDCEB" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="58" cy="28" r="3" fill="#6255A5" />
        <line x1="66" y1="26" x2="93" y2="16" stroke="#DFDCEB" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

// Sidebar Support / Help Illustration (from Reference 2 bottom)
export function SupportIllustration({ className = "w-20 h-20" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="42" fill="#F5F4FA" />
      {/* Character with headset */}
      <circle cx="50" cy="42" r="14" fill="#38304F" />
      <ellipse cx="50" cy="42" r="11" fill="#F7DCE5" />
      <path d="M38 40C38 30 46 28 54 28C62 28 64 34 62 42C58 38 52 38 48 40C44 42 40 42 38 40Z" fill="#38304F" />
      
      {/* Headset band & mic */}
      <path d="M38 42C38 32 62 32 62 42" stroke="#6255A5" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <rect x="36" y="40" width="4" height="6" rx="2" fill="#6255A5" />
      <rect x="60" y="40" width="4" height="6" rx="2" fill="#6255A5" />
      <path d="M62 44C62 48 56 50 54 50" stroke="#6255A5" strokeWidth="1.5" strokeLinecap="round" />

      {/* 24/7 pill badge */}
      <rect x="58" y="22" width="32" height="15" rx="7.5" fill="#F3AFA5" />
      <text x="64" y="33" fill="#FFFFFF" fontSize="9" fontWeight="bold">24/7</text>
    </svg>
  );
}

// Upgrade / Achievement illustration (from Reference 3 bottom left)
export function UpgradeIllustration({ className = "w-24 h-24" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="50" cy="50" r="40" fill="#F7DCE5" opacity="0.6" />
      {/* Grad cap */}
      <polygon points="50,22 80,32 50,42 20,32" fill="#38304F" />
      <rect x="38" y="37" width="24" height="10" rx="3" fill="#38304F" />
      {/* Tassel */}
      <path d="M72 34V46C72 48 70 50 68 50" stroke="#F2C98A" strokeWidth="2" strokeLinecap="round" />
      <circle cx="68" cy="51" r="2" fill="#F2C98A" />

      {/* Cheerful character below */}
      <circle cx="50" cy="62" r="12" fill="#F7DCE5" />
      <path d="M42 58C42 50 50 48 58 48C62 48 64 52 62 58Z" fill="#38304F" />
      {/* Raised arm */}
      <path d="M36 78L32 60L42 66" stroke="#38304F" strokeWidth="3" strokeLinecap="round" />
      {/* Body */}
      <path d="M38 74C38 68 44 66 50 66C56 66 62 68 62 74L60 90H40L38 74Z" fill="#6255A5" />
    </svg>
  );
}
