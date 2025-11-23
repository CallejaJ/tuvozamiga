"use client";
import { useOrgaAI, OrgaVideo, OrgaAudio } from "@orga-ai/react";
import { Zap, Shield, Globe, Play, Square, Mic2 } from "lucide-react";
import { toast } from "sonner";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header Section */}
      <Header />

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Latencia en Tiempo Real
              </h3>
              <p className="text-slate-600">
                Optimizado para comunicación de latencia ultra baja, asegurando conversaciones
                naturales y fluidas.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Seguro y Privado
              </h3>
              <p className="text-slate-600">
                Encriptación de extremo a extremo para todos los flujos. Tus datos permanecen tuyos
                y nunca se almacenan.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Desplegado en el Borde
              </h3>
              <p className="text-slate-600">
                Ejecutándose en redes globales de borde para acercar el procesamiento de IA a
                tus usuarios.
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
              Demo Interactiva
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Prueba la integración directamente en tu navegador. No se requiere instalación.
            </p>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <DemoComponent />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
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

  const canStart =
    connectionState === "disconnected" || connectionState === "closed";
  const canEnd = connectionState === "connected";

  const handleToggleCamera = async () => {
    try {
      await toggleCamera();
    } catch (error) {
      console.error("Error toggling camera:", error);
      toast.error(
        "No se pudo acceder a la cámara. Por favor verifica los permisos del navegador."
      );
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "connecting":
        return "CONECTANDO";
      case "connected":
        return "CONECTADO";
      case "disconnected":
        return "DESCONECTADO";
      case "closed":
        return "CERRADO";
      default:
        return status.toUpperCase();
    }
  };

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
              Estado: {getStatusText(connectionState)}
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => startSession()}
              disabled={!canStart}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <Play className="h-4 w-4 mr-2" />
              Iniciar Sesión
            </button>
            <button
              onClick={() => endSession()}
              disabled={!canEnd}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-red-200"
            >
              <Square className="h-4 w-4 mr-2 fill-current" />
              Terminar Sesión
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
                  <Mic2 className="h-4 w-4" /> Conectado - Habla naturalmente
                </p>
              </div>
            </div>
          )}

        {connectionState === "connected" && !isMicOn && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-yellow-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium">
              Por favor active el micrófono para continuar
            </div>
          </div>
        )}

          {!userVideoStream && connectionState !== "connected" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <p className="text-lg mb-2">Haz clic en "Iniciar Sesión" para comenzar</p>
                <p className="text-sm">Se requiere acceso al micrófono</p>
              </div>
            </div>
          )}
        </div>

        {connectionState === "connected" && (
          <div className="grid grid-cols-1 gap-4 mb-6">
            <button
              onClick={toggleMic}
              className={`p-4 rounded-lg font-medium transition-colors ${
                isMicOn
                  ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-300"
                  : "bg-slate-100 text-slate-600 border-2 border-slate-200"
              }`}
            >
              {isMicOn ? "🎤 Micrófono Encendido" : "🔇 Micrófono Apagado"}
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Modelo de IA
            </h4>
            <p className="text-slate-900 font-medium">orga-1-beta</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Voz
            </h4>
            <p className="text-slate-900 font-medium">Alloy</p>
          </div>
        </div>

        <OrgaAudio stream={aiAudioStream} />
      </div>
    </div>
  );
}
