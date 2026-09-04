"use client";

interface LogoMarkProps {
  className?: string;
  size?: number;
}

export function MickydonsLogoMark({ className = "", size = 42 }: LogoMarkProps) {
  return (
    <div 
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_12px_rgba(53,214,208,0.25)]"
      >
        <defs>
          {/* Gold Shield Gradient */}
          <linearGradient id="goldShield" x1="15%" y1="5%" x2="85%" y2="95%">
            <stop offset="0%" stopColor="#F5E4B5" />
            <stop offset="35%" stopColor="#C6A96B" />
            <stop offset="70%" stopColor="#8A6E35" />
            <stop offset="100%" stopColor="#D8BE7D" />
          </linearGradient>

          {/* Inner Dark Background */}
          <radialGradient id="shieldBg" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#0F1C28" />
            <stop offset="100%" stopColor="#06090D" />
          </radialGradient>

          {/* Cyan Glow for Fingerprint */}
          <linearGradient id="cyanTrail" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8AF2E9" />
            <stop offset="100%" stopColor="#35D6D0" />
          </linearGradient>

          {/* Lens Rim Gold */}
          <linearGradient id="lensGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D1" />
            <stop offset="60%" stopColor="#C6A96B" />
            <stop offset="100%" stopColor="#785922" />
          </linearGradient>
        </defs>

        {/* Outer Shield Border */}
        <path 
          d="M50 5 L84 19 C84 55 68 79 50 95 C32 79 16 55 16 19 Z" 
          fill="url(#goldShield)" 
        />

        {/* Inner Shield Cavity */}
        <path 
          d="M50 9 L80 21.5 C80 53 65.5 75 50 89.5 C34.5 75 20 53 20 21.5 Z" 
          fill="url(#shieldBg)" 
        />

        {/* Subtle Cyber Grid Lines inside Shield */}
        <path 
          d="M30 35 H70 M25 50 H75 M32 65 H68" 
          stroke="#35D6D0" 
          strokeWidth="0.5" 
          strokeOpacity="0.2" 
          strokeDasharray="2 2"
        />

        {/* Stylized 'M' Behind the Lens */}
        <path 
          d="M27 70 V32 L40 50 L50 36 L60 50 L73 32 V70" 
          stroke="url(#goldShield)" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeOpacity="0.9"
        />

        {/* Magnifying Glass Outer Rim */}
        <circle 
          cx="50" 
          cy="52" 
          r="20" 
          stroke="url(#lensGold)" 
          strokeWidth="3.5" 
          fill="#06090D" 
          fillOpacity="0.75"
        />

        {/* Magnifying Glass Handle */}
        <path 
          d="M65 67 L80 82" 
          stroke="url(#lensGold)" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
        />
        <circle cx="80" cy="82" r="2.5" fill="#DFC282" />

        {/* Cyan Fingerprint Evidence Loops Inside Lens */}
        <g stroke="url(#cyanTrail)" strokeWidth="1.6" strokeLinecap="round" fill="none">
          {/* Core loop */}
          <path d="M50 43 C46 43 44 46 44 51 C44 56 47 59 50 59 C52 59 54 57 54 53" />
          {/* Middle loop */}
          <path d="M50 39 C43 39 40 44 40 51 C40 58 44 63 50 63 C55 63 58 60 58 53 C58 48 56 45 53 45" />
          {/* Outer loop */}
          <path d="M50 35 C40 35 36 42 36 51 C36 61 41 67 50 67 C58 67 62 62 62 53" />
        </g>

        {/* Specular Highlight on Lens */}
        <path 
          d="M37 42 C40 38 46 36 52 36" 
          stroke="#FFFFFF" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          strokeOpacity="0.6"
        />
      </svg>
    </div>
  );
}
