// This file mimics the @orga-ai/react package for demonstration purposes
// since the actual package cannot be installed in this environment.

"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

type ConnectionState = "disconnected" | "connecting" | "connected"

interface OrgaContextType {
  connectionState: ConnectionState
  startSession: () => Promise<void>
  endSession: () => Promise<void>
  isCameraOn: boolean
  toggleCamera: () => void
  isMicOn: boolean
  toggleMic: () => void
  userVideoStream: MediaStream | null
  aiAudioStream: MediaStream | null
  isAiSpeaking: boolean
}

const OrgaContext = createContext<OrgaContextType | null>(null)

let globalConfig: {
  logLevel?: string
  fetchSessionConfig?: () => Promise<any>
  model?: string
  voice?: string
} = {}

export const OrgaAI = {
  init: (config: { logLevel?: string; fetchSessionConfig: () => Promise<any>; model?: string; voice?: string }) => {
    console.log("[OrgaAI Mock] Initialized with config:", config)
    globalConfig = config
  },
}

export function OrgaAIProvider({ children }: { children: React.ReactNode }) {
  const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected")
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [isMicOn, setIsMicOn] = useState(false)
  const [userVideoStream, setUserVideoStream] = useState<MediaStream | null>(null)
  const [isAiSpeaking, setIsAiSpeaking] = useState(false)

  const startSession = async () => {
    setConnectionState("connecting")
    try {
      if (globalConfig.fetchSessionConfig) {
        console.log("[OrgaAI Mock] Fetching session config...")
        const config = await globalConfig.fetchSessionConfig()
        console.log("[OrgaAI Mock] Received session config:", config)
        if (!config || !config.ephemeralToken) {
          throw new Error("Invalid config received from server")
        }
      }

      // Simulate connection delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setConnectionState("connected")
      setIsCameraOn(true)
      setIsMicOn(true)

      if (typeof window !== "undefined") {
        setUserVideoStream(new MediaStream())
      }

      simulateConversation()
    } catch (error) {
      console.error("[OrgaAI Mock] Failed to start session:", error)
      setConnectionState("disconnected")
      alert("Failed to start session. Check console for details.")
    }
  }

  const simulateConversation = () => {
    // Wait a bit, then AI "speaks"
    setTimeout(() => {
      setIsAiSpeaking(true)
      console.log("[OrgaAI Mock] AI started speaking")

      // Stop speaking after a few seconds
      setTimeout(() => {
        setIsAiSpeaking(false)
        console.log("[OrgaAI Mock] AI stopped speaking")
      }, 3000)
    }, 2000)
  }

  const endSession = async () => {
    setConnectionState("disconnected")
    setIsCameraOn(false)
    setIsMicOn(false)
    setUserVideoStream(null)
    setIsAiSpeaking(false)
  }

  const toggleCamera = () => {
    setIsCameraOn((prev) => {
      const newState = !prev
      if (typeof window !== "undefined") {
        setUserVideoStream(newState ? new MediaStream() : null)
      }
      return newState
    })
  }

  const toggleMic = () => setIsMicOn((prev) => !prev)

  return (
    <OrgaContext.Provider
      value={{
        connectionState,
        startSession,
        endSession,
        isCameraOn,
        toggleCamera,
        isMicOn,
        toggleMic,
        userVideoStream,
        aiAudioStream: null,
        isAiSpeaking,
      }}
    >
      {children}
    </OrgaContext.Provider>
  )
}

export function useOrgaAI() {
  const context = useContext(OrgaContext)
  if (!context) {
    throw new Error("useOrgaAI must be used within an OrgaAIProvider")
  }
  return context
}

export function OrgaVideo({ stream, className }: { stream: MediaStream | null; className?: string }) {
  return (
    <div className={`${className} bg-gray-900 flex items-center justify-center text-gray-500 overflow-hidden relative`}>
      {stream ? (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-gray-800">
          <span className="text-sm">Video Stream Active</span>
        </div>
      ) : (
        <span>Camera Off</span>
      )}
    </div>
  )
}

export function OrgaAudio({ stream }: { stream: MediaStream | null }) {
  return null // Invisible audio element
}
