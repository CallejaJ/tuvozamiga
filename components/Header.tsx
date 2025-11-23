"use client";
import Image from "next/image";
import { Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden bg-slate-900 text-white">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 pointer-events-none" />

      <div className="container mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/icon/logo-lille.png"
              alt="Orga AI Logo"
              width={200}
              height={60}
              priority
              className="h-12 w-auto"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 backdrop-blur-xl mb-6">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
            TUVOZAMIGA Beta
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400 px-2">
            TUVOZAMIGA
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-300 mb-6 max-w-2xl leading-relaxed">
            Tu compañero virtual siempre disponible. Escucha activa, empatía y
            conversación cuando más lo necesitas.
          </p>

          {/* Headphones Recommendation */}
          <p className="text-sm md:text-base text-indigo-300 mb-10 flex items-center justify-center gap-2 bg-indigo-900/30 py-2 px-4 rounded-full border border-indigo-500/20">
            <span>🎧</span> Se recomienda el uso de auriculares para una mejor experiencia
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
            >
              Hablar con alguien
            </a>
            <a
              href="https://docs.orga-ai.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-all backdrop-blur-sm"
            >
              Ver Documentación
            </a>
          </div>
        </div>
      </div>

      {/* Abstract shapes */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl opacity-50" />
    </header>
  );
}
