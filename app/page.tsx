"use client";
import React from "react";
import { useOrgaAI, OrgaVideo, OrgaAudio } from "@orga-ai/react";
import { Zap, Shield, Globe, Play, Square, Mic2 } from "lucide-react";
import { toast } from "sonner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WaveVisualizer from "../components/WaveVisualizer";

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

  const [audioStream, setAudioStream] = React.useState<MediaStream | null>(null);

  React.useEffect(() => {
    let stream: MediaStream | null = null;

    const getAudioStream = async () => {
      if (connectionState === "connected" && isMicOn) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          setAudioStream(stream);
        } catch (error) {
          console.error("Error accessing microphone for visualizer:", error);
        }
      } else {
        setAudioStream(null);
      }
    };

    getAudioStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [connectionState, isMicOn]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connecting":
        return "bg-amber-500 shadow-amber-500/50";
      case "connected":
        return "bg-emerald-500 shadow-emerald-500/50";
      case "disconnected":
      case "closed":
      default:
        return "bg-slate-400 shadow-slate-400/50";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "connecting":
        return "Conectando...";
      case "connected":
        return "En línea";
      case "disconnected":
        return "Desconectado";
      case "closed":
        return "Sesión Cerrada";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 ring-1 ring-slate-900/5">
      {/* Header Bar */}
      <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/50">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getStatusColor(
                connectionState
              ).split(" ")[0]}`}
            ></span>
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${getStatusColor(
                connectionState
              )}`}
            ></span>
          </div>
          <span className="font-semibold text-slate-700 text-sm tracking-wide uppercase">
            {getStatusText(connectionState)}
          </span>
        </div>

        <div className="flex items-center gap-2">
           {/* Model Info Badges */}
           <div className="hidden sm:flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                Modelo: orga-1-beta
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                Voz: nova
              </span>
           </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        {/* Main Visualizer Area */}
        <div className="relative bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video shadow-inner ring-1 ring-black/5 mb-6 md:mb-8 group">
          {connectionState === "connected" ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <WaveVisualizer stream={audioStream} />
            </div>
          ) : (
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay transition-opacity duration-700"></div>
          )}

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center z-10">
            {!userVideoStream && connectionState !== "connected" && (
               <div className="space-y-4 md:space-y-6 max-w-md animate-in fade-in zoom-in duration-500 w-full">
                  <div className="h-16 w-16 md:h-20 md:w-20 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/10 ring-4 ring-white/5">
                    <Mic2 className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Listo para conversar</h3>
                    <p className="text-slate-300 text-sm md:text-base px-2">
                      Experimenta la latencia ultra baja de OrgaAI. Pulsa iniciar para conectar.
                    </p>
                  </div>
               </div>
            )}
            
            {connectionState === "connected" && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"/>
                    <span className="text-xs font-medium text-white/90">En vivo</span>
                </div>
            )}
          </div>
          
           {/* Mic Warning */}
           {connectionState === "connected" && !isMicOn && (
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 w-max max-w-[90%]">
              <div className="flex items-center gap-2 md:gap-3 bg-red-500/90 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-bottom-4">
                <Mic2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm font-medium truncate">Micrófono desactivado</span>
              </div>
            </div>
          )}
        </div>

        {/* Control Bar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
            <button
              onClick={() => startSession()}
              disabled={!canStart}
              className={`group relative w-full md:w-auto min-w-[160px] inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-white transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${
                  !canStart ? 'bg-slate-300' : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:shadow-lg hover:shadow-indigo-500/30'
              }`}
            >
              <span className="absolute inset-0 rounded-xl bg-white/20 group-hover:opacity-100 opacity-0 transition-opacity" />
              <Play className="h-5 w-5 mr-2.5 fill-current" />
              <span>Iniciar Sesión</span>
            </button>

            <button
              onClick={() => endSession()}
              disabled={!canEnd}
              className={`w-full md:w-auto min-w-[160px] inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold transition-all border-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${
                  !canEnd 
                  ? 'border-slate-100 text-slate-300 bg-slate-50' 
                  : 'border-red-100 text-red-600 bg-red-50/50 hover:bg-red-50 hover:border-red-200'
              }`}
            >
              <Square className="h-5 w-5 mr-2.5 fill-current" />
              <span>Terminar</span>
            </button>
            
            {connectionState === "connected" && (
              <button
                type="button"
                onClick={toggleMic}
                className={`hidden md:inline-flex p-3.5 rounded-full transition-all duration-200 ring-2 touch-manipulation ${
                    isMicOn 
                    ? 'bg-slate-100 text-slate-700 ring-transparent hover:bg-slate-200' 
                    : 'bg-red-50 text-red-600 ring-red-100 hover:bg-red-100'
                }`}
                title={isMicOn ? "Silenciar micrófono" : "Activar micrófono"}
                aria-label={isMicOn ? "Silenciar micrófono" : "Activar micrófono"}
              >
                {isMicOn ? <Mic2 className="h-5 w-5" /> : <div className="relative"><Mic2 className="h-5 w-5"/><div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"/></div>}
              </button>
            )}
          </div>
          
          {/* Mobile Microphone Button - Separate Row */}
          {connectionState === "connected" && (
            <div className="flex md:hidden justify-center">
              <button
                type="button"
                onClick={toggleMic}
                className={`p-3.5 rounded-full transition-all duration-200 ring-2 touch-manipulation active:scale-95 ${
                    isMicOn 
                    ? 'bg-slate-100 text-slate-700 ring-transparent hover:bg-slate-200' 
                    : 'bg-red-50 text-red-600 ring-red-100 hover:bg-red-100'
                }`}
                title={isMicOn ? "Silenciar micrófono" : "Activar micrófono"}
                aria-label={isMicOn ? "Silenciar micrófono" : "Activar micrófono"}
              >
                {isMicOn ? <Mic2 className="h-5 w-5" /> : <div className="relative"><Mic2 className="h-5 w-5"/><div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"/></div>}
              </button>
            </div>
          )}
        </div>
      </div>

      <OrgaAudio stream={aiAudioStream} />
    </div>
  );
}
