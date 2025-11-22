"use client";
// ✅ Import correcto - de la librería real
import { useOrgaAI, OrgaVideo, OrgaAudio } from "@orga-ai/react";
import { Activity, Zap, Shield, Globe, Play, Square, Mic2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 pointer-events-none" />
        <div className="container mx-auto px-4 pt-20 pb-24 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-300 backdrop-blur-xl mb-6">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2 animate-pulse"></span>
              Orga AI v1.0 Beta
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
              Next-Gen AI Interfaces
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Experience the future of human-computer interaction with real-time
              video and audio processing, powered by Orga AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <a
                href="#demo"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all"
              >
                Try the Demo
              </a>
              <a
                href="https://docs.orga-ai.com/docs/server-sdks/node/quick-start"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 px-8 py-3 text-sm font-semibold text-white hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 transition-all backdrop-blur-sm"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>

        {/* Abstract shapes */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-3xl opacity-50" />
      </header>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Real-time Latency
              </h3>
              <p className="text-slate-600">
                Optimized for ultra-low latency communication, ensuring natural
                and fluid conversations.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Secure & Private
              </h3>
              <p className="text-slate-600">
                End-to-end encryption for all streams. Your data remains yours
                and is never stored.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Edge Deployed
              </h3>
              <p className="text-slate-600">
                Running on global edge networks to bring AI processing closer to
                your users.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Interactive Demo
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Test the integration directly in your browser. No installation
              required.
            </p>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <DemoComponent />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Activity className="h-6 w-6 text-indigo-400" />
            <span className="text-xl font-bold text-white">Orga AI</span>
          </div>
          <p className="mb-6 text-sm">
            © 2025 Orga AI Inc. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DemoComponent() {
  const {
    startSession,
    endSession,
    connectionState,
    userVideoStream,
    aiAudioStream,
    isCameraOn,
    toggleCamera,
    isMicOn,
    toggleMic,
  } = useOrgaAI();

  // ✅ Condiciones mejoradas para los botones
  const canStart =
    connectionState === "disconnected" || connectionState === "closed";
  const canEnd = connectionState === "connected";

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-3">
            <div
              className={`h-3 w-3 rounded-full ${
                connectionState === "connected"
                  ? "bg-green-500 animate-pulse"
                  : connectionState === "connecting"
                  ? "bg-yellow-500 animate-bounce"
                  : "bg-slate-300"
              }`}
            />
            <span className="font-medium text-slate-700 capitalize">
              Status: {connectionState}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => startSession()}
              disabled={!canStart}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Session
            </button>
            <button
              onClick={() => endSession()}
              disabled={!canEnd}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-red-200"
            >
              <Square className="h-4 w-4 mr-2 fill-current" />
              End Session
            </button>
          </div>
        </div>

        <div className="relative bg-slate-900 rounded-xl overflow-hidden aspect-video shadow-inner mb-6">
          <OrgaVideo
            stream={userVideoStream}
            className="w-full h-full object-cover"
          />

          {connectionState === "connected" && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                <p className="text-white/80 text-sm flex items-center gap-2">
                  <Mic2 className="h-4 w-4" /> Connected - Speak naturally
                </p>
              </div>
            </div>
          )}

          {/* Mensaje cuando no está conectado */}
          {!userVideoStream && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <p className="text-lg mb-2">Click "Start Session" to begin</p>
                <p className="text-sm">Camera and microphone access required</p>
              </div>
            </div>
          )}
        </div>

        {/* Controles de cámara/micrófono solo cuando está conectado */}
        {connectionState === "connected" && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={toggleCamera}
              className={`p-4 rounded-lg font-medium transition-colors ${
                isCameraOn
                  ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
                  : "bg-slate-100 text-slate-600 border-2 border-slate-200"
              }`}
            >
              {isCameraOn ? "📹 Camera On" : "📷 Camera Off"}
            </button>
            <button
              onClick={toggleMic}
              className={`p-4 rounded-lg font-medium transition-colors ${
                isMicOn
                  ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
                  : "bg-slate-100 text-slate-600 border-2 border-slate-200"
              }`}
            >
              {isMicOn ? "🎤 Mic On" : "🔇 Mic Off"}
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
              AI Model
            </h4>
            <p className="text-slate-900 font-medium">orga-1-beta</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Voice
            </h4>
            <p className="text-slate-900 font-medium">Alloy</p>
          </div>
        </div>

        <OrgaAudio stream={aiAudioStream} />
      </div>
    </div>
  );
}
