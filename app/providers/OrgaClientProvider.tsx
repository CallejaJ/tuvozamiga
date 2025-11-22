"use client"
// In a real app, you would import from '@orga-ai/react'
import { OrgaAI, OrgaAIProvider } from "@/lib/orga-ai-mock"
import type React from "react"

// Initialize Orga once near startup
// The documentation calls for this specific initialization pattern
OrgaAI.init({
  logLevel: "debug",
  fetchSessionConfig: async () => {
    const res = await fetch("/api/orga-client-secrets")
    if (!res.ok) {
      throw new Error("Failed to fetch session config")
    }
    return await res.json() // { ephemeralToken, iceServers }
  },
  model: "orga-1-beta",
  voice: "alloy",
})

export function OrgaClientProvider({ children }: { children: React.ReactNode }) {
  return <OrgaAIProvider>{children}</OrgaAIProvider>
}
