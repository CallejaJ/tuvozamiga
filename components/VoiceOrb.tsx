"use client";

interface VoiceOrbProps {
  size?: number;
  className?: string;
}

// Orbe de voz: esfera cálida que "respira" y emite ondas
export default function VoiceOrb({ size = 120, className = "" }: VoiceOrbProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Ondas expansivas */}
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute inset-0 rounded-full border-2 border-amber-300/50"
          style={{ animation: `tv-orb-ring 3.6s ease-out ${i * 1.2}s infinite` }}
        />
      ))}
      {/* Esfera principal */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300 via-orange-400 to-rose-500 shadow-[0_0_60px_-10px_rgba(249,115,22,0.7)] animate-breathe" />
      {/* Brillo superior */}
      <div className="absolute inset-[15%] rounded-full bg-gradient-to-tl from-transparent via-white/10 to-white/60" />
    </div>
  );
}
