"use client";
import Image from "next/image";
import { Globe, Headphones } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-slate-950 text-white min-h-[85vh] flex items-center justify-center">
      {/* Background Effects matching user reference */}
      <div className="absolute inset-0 bg-[#020617] pointer-events-none" />
      
      {/* Top Left - Blueish Orb */}
      <div className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-indigo-600/30 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen" />
      
      {/* Top Right - Purple Orb */}
      <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] bg-purple-600/25 rounded-full blur-[100px] mix-blend-screen" />
      
      {/* Bottom Center - Cyan/Blue Glow */}
      <div className="absolute -bottom-[20%] left-[20%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[130px] mix-blend-screen" />

      {/* Central faint radial gradient to highlight text */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:40px_40px] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-10 animate-fade-in-down">
            <Image
              src="/icon/logo-lille.png"
              alt="Orga AI Logo"
              width={180}
              height={54}
              priority
              className="h-10 w-auto opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-fade-in-up delay-100">
            <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 backdrop-blur-xl">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
              TUVOZAMIGA Beta
            </div>
            <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300 backdrop-blur-xl">
              <Globe className="h-3 w-3 mr-1.5" />
              Disponible en +40 idiomas
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-8 animate-fade-in-up delay-200">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
              TUVOZAMIGA
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-2xl text-slate-300 mb-10 max-w-2xl leading-relaxed font-light animate-fade-in-up delay-300">
            Tu compañero virtual siempre disponible. Escucha activa, empatía y
            conversación humana cuando más lo necesitas.
          </p>

          {/* Headphones Recommendation */}
          <div className="animate-fade-in-up delay-500">
             <p className="inline-flex items-center gap-2 text-sm text-indigo-200/80 mb-10 bg-indigo-950/50 py-2 px-5 rounded-full border border-indigo-500/20 hover:border-indigo-500/40 transition-colors cursor-help">
                <Headphones className="h-4 w-4" /> 
                Se recomienda usar auriculares para la mejor experiencia
             </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 w-full justify-center animate-fade-in-up delay-700">
            <a
              href="#demo"
              className="group relative inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_-5px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">Hablar con alguien</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            <a
              href="https://docs.orga-ai.com/tutorials"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/40 px-8 py-4 text-base font-bold text-white hover:bg-slate-800/80 hover:border-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-all backdrop-blur-sm"
            >
              Ver Documentación
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
