"use client";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-12 relative overflow-hidden">
      {/* Subtle warm glow */}
      <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/icon/logo-lille.png"
            alt="Orga AI Logo"
            width={150}
            height={45}
            className="h-8 w-auto"
          />
        </div>

        {/* Tagline */}
        <p className="mb-6 text-sm text-stone-300 inline-flex items-center gap-1.5">
          Hecho con <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />{" "}
          para que nadie se sienta solo
        </p>

        {/* Copyright */}
        <p className="mb-6 text-sm">
          © 2026 Orga AI. Todos los derechos reservados.
        </p>

        {/* Links */}
        <div className="flex justify-center space-x-6 text-sm">
          <a href="#" className="hover:text-amber-300 transition-colors">
            Privacidad
          </a>
          <a href="#" className="hover:text-amber-300 transition-colors">
            Términos
          </a>
          <a
            href="https://docs.orga-ai.com/tutorials"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300 transition-colors"
          >
            Documentación
          </a>
        </div>
      </div>
    </footer>
  );
}
