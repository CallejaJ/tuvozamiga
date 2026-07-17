"use client";
import Image from "next/image";
import { useState } from "react";
import type React from "react";
import { Heart, Headphones, Globe, ChevronDown } from "lucide-react";
import TypewriterWords from "./TypewriterWords";
import FloatingMessages from "./FloatingMessages";

export default function Header() {
  // Parallax suave siguiendo el ratón
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setOffset({ x, y });
  };

  return (
    <header
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-gradient-to-b from-orange-50 via-amber-50 to-rose-50 text-stone-800 min-h-[92vh] flex items-center justify-center"
    >
      {/* Orbes cálidos con parallax + deriva orgánica */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-amber-300/40 rounded-full blur-[120px] animate-blob"
        style={{ translate: `${offset.x * 30}px ${offset.y * 20}px` }}
      />
      <div
        className="absolute top-[15%] right-[0%] w-[420px] h-[420px] bg-rose-300/35 rounded-full blur-[110px] animate-blob animation-delay-2000"
        style={{ translate: `${offset.x * -25}px ${offset.y * 25}px` }}
      />
      <div
        className="absolute -bottom-[25%] left-[25%] w-[600px] h-[600px] bg-teal-200/30 rounded-full blur-[130px] animate-blob animation-delay-4000"
        style={{ translate: `${offset.x * 18}px ${offset.y * -18}px` }}
      />

      {/* Luz radial central */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.6)_0%,transparent_70%)] pointer-events-none" />

      {/* Trama sutil */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:40px_40px] opacity-[0.07] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] pointer-events-none" />

      {/* Conversación flotante alrededor del contenido */}
      <FloatingMessages />

      <div className="container mx-auto px-4 relative z-20 py-20">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <Image
              src="/icon/logo-lille.png"
              alt="Orga AI Logo"
              width={180}
              height={54}
              priority
              className="h-10 w-auto [filter:brightness(0)] opacity-55 hover:opacity-75 transition-opacity"
            />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center rounded-full border border-rose-300/60 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-rose-600 backdrop-blur-xl shadow-sm">
              <Heart className="h-3 w-3 mr-1.5 fill-rose-500 text-rose-500 animate-pulse" />
              TUVOZAMIGA Beta
            </div>
            <div className="inline-flex items-center rounded-full border border-teal-300/60 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-teal-700 backdrop-blur-xl shadow-sm">
              <Globe className="h-3 w-3 mr-1.5" />
              Disponible en +40 idiomas
            </div>
          </div>

          {/* Título */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500">
              TUVOZAMIGA
            </span>
          </h1>

          {/* Subtítulo dinámico con máquina de escribir */}
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-stone-700 mb-8 min-h-[1.4em] animate-in fade-in duration-1000">
            Una voz amiga que{" "}
            <TypewriterWords
              words={[
                "te escucha.",
                "te acompaña.",
                "te entiende.",
                "está contigo.",
              ]}
              className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-rose-500"
            />
          </p>

          {/* Descripción */}
          <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl leading-relaxed font-light animate-in fade-in slide-in-from-bottom-6 duration-700">
            Escucha activa, empatía y conversación cálida cuando más lo
            necesitas. De día o de madrugada.
          </p>

          {/* Recomendación de auriculares */}
          <div className="animate-in fade-in duration-1000">
            <p className="inline-flex items-center gap-2 text-sm text-amber-800/90 mb-10 bg-amber-100/70 py-2 px-5 rounded-full border border-amber-300/50 hover:border-amber-400/70 transition-colors cursor-help">
              <Headphones className="h-4 w-4" />
              Se recomienda usar auriculares para la mejor experiencia
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-5 w-full justify-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <a
              href="#demo"
              className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-rose-500/40 transition-all transform hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              <Heart className="h-4 w-4 mr-2 fill-current group-hover:animate-pulse" />
              <span className="relative z-10">Hablar con alguien</span>
            </a>
            <a
              href="https://docs.orga-ai.com/tutorials"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-stone-300 bg-white/70 px-8 py-4 text-base font-bold text-stone-700 hover:bg-white hover:border-stone-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 transition-all backdrop-blur-sm shadow-sm"
            >
              Ver Documentación
            </a>
          </div>

          {/* Conversación en móvil (en escritorio flota a los lados) */}
          <FloatingMessages variant="inline" />
        </div>
      </div>

      {/* Indicador de scroll */}
      <a
        href="#demo"
        aria-label="Ir a la demo"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-stone-400 hover:text-rose-500 transition-colors animate-bounce"
      >
        <ChevronDown className="h-7 w-7" />
      </a>

      {/* Fundido hacia la siguiente sección */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </header>
  );
}
