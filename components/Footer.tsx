"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="container mx-auto px-4 text-center">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/icon/logo-lille.png"
            alt="Orga AI Logo"
            width={150}
            height={45}
            className="h-8 w-auto"
          />
        </div>

        {/* Copyright */}
        <p className="mb-6 text-sm">© 2025 Orga AI. Todos los derechos reservados.</p>

        {/* Links */}
        <div className="flex justify-center space-x-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">
            Privacidad
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Términos
          </a>
          <a
            href="docs.orga-ai.com/tutorials"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Documentación
          </a>
        </div>
      </div>
    </footer>
  );
}
