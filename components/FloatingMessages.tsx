"use client";
import { useEffect, useState } from "react";

// Conversación de ejemplo que "vive" alrededor del hero
const MESSAGES = [
  { text: "Hoy ha sido un día difícil...", side: "right", top: "24%" },
  { text: "Te escucho. Cuéntame qué ha pasado", side: "left", top: "30%" },
  { text: "Gracias por estar siempre ahí", side: "right", top: "60%" },
  { text: "Siempre. Para eso estoy", side: "left", top: "66%" },
] as const;

export default function FloatingMessages() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % (MESSAGES.length + 1)),
      2600
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 hidden lg:block z-10"
      aria-hidden="true"
    >
      {MESSAGES.map((m, i) => {
        const visible = i < active;
        const isAI = m.side === "left";
        return (
          <div
            key={i}
            className={`absolute max-w-[250px] px-4 py-2.5 text-sm font-medium rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-700 animate-float ${
              isAI
                ? "left-[5%] rounded-bl-sm bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-rose-200"
                : "right-[5%] rounded-br-sm bg-white/90 text-stone-700 border border-orange-100"
            } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ top: m.top, animationDelay: `${i * 0.9}s` }}
          >
            {m.text}
          </div>
        );
      })}
    </div>
  );
}
