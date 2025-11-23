// app/providers/OrgaProviderClient.tsx
"use client";
import { OrgaAI, OrgaAIProvider } from "@orga-ai/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

export default function OrgaProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialized = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!initialized.current) {
      try {
        console.log("🚀 Initializing OrgaAI...");

        OrgaAI.init({
          logLevel: "info",
          sessionConfigEndpoint: "/api/orga-client-secrets",
          model: "orga-1-beta",
          voice: "nova",
        });

        initialized.current = true;
        setIsReady(true);

        console.log("✅ OrgaAI initialized successfully");
      } catch (error) {
        console.error("❌ Error initializing OrgaAI:", error);
      }
    }
  }, []);

  // Esperar a que esté listo antes de renderizar
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white">Initializing OrgaAI...</div>
      </div>
    );
  }

  return <OrgaAIProvider>{children}</OrgaAIProvider>;
}
