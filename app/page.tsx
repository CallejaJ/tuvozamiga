"use client";
import React from "react";
import { useOrgaAI, OrgaVideo, OrgaAudio } from "@orga-ai/react";
import { Heart, Shield, Clock, Play, Square, Mic2 } from "lucide-react";
import { toast } from "sonner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WaveVisualizer from "../components/WaveVisualizer";
import Reveal from "../components/Reveal";
import VoiceOrb from "../components/VoiceOrb";

// Voces en español disponibles en Orga AI
const VOICES = [
  { id: "Sofía", label: "Sofía · Cálida y animada" },
  { id: "Marta - Relaxed Woman", label: "Marta · Tranquila" },
  { id: "Teresa - Caring Mother", label: "Teresa · Maternal" },
  { id: "Lucía - Instructor", label: "Lucía · Cercana" },
  { id: "Clara - Narrator", label: "Clara · Serena" },
  { id: "Álvaro - Self-assured Young Professional", label: "Álvaro · Seguro" },
  { id: "Emilio - Digital Voice", label: "Emilio · Natural" },
  { id: "Juan - Formal Presenter", label: "Juan · Formal" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section */}
      <Header />

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              Alguien que te escucha, siempre
            </h2>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">
              Diseñado con un solo propósito: que nunca te sientas solo.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={0} className="flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-b from-amber-50 to-orange-50/50 border border-amber-100 hover:shadow-xl hover:shadow-amber-100/60 hover:-translate-y-1 transition-all duration-300">
              <div className="h-14 w-14 bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-orange-200">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">
                Siempre disponible
              </h3>
              <p className="text-stone-600 leading-relaxed">
                De día o de madrugada, tu voz amiga responde al instante.
                Conversaciones naturales y fluidas, sin esperas.
              </p>
            </Reveal>
            <Reveal delay={120} className="flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-b from-rose-50 to-pink-50/50 border border-rose-100 hover:shadow-xl hover:shadow-rose-100/60 hover:-translate-y-1 transition-all duration-300">
              <div className="h-14 w-14 bg-gradient-to-br from-rose-400 to-pink-500 text-white rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-rose-200">
                <Heart className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">
                Escucha con empatía
              </h3>
              <p className="text-stone-600 leading-relaxed">
                No solo oye: entiende. Una compañía diseñada para acompañarte,
                animarte y estar presente en tu día a día.
              </p>
            </Reveal>
            <Reveal delay={240} className="flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-b from-teal-50 to-emerald-50/50 border border-teal-100 hover:shadow-xl hover:shadow-teal-100/60 hover:-translate-y-1 transition-all duration-300">
              <div className="h-14 w-14 bg-gradient-to-br from-teal-400 to-emerald-500 text-white rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-teal-200">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-stone-800 mb-2">
                Privado y seguro
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Tus conversaciones están cifradas de extremo a extremo y nunca
                se almacenan. Lo que cuentas, se queda contigo.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section
        id="demo"
        className="py-24 bg-gradient-to-b from-white via-amber-50/40 to-rose-50/40 relative"
      >
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-800 mb-4">
              Empieza a conversar
            </h2>
            <p className="text-lg text-stone-500 max-w-2xl mx-auto">
              Prueba directamente en tu navegador. Sin instalar nada, sin
              registrarte.
            </p>
          </Reveal>

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
    updateParams,
  } = useOrgaAI();

  const canStart =
    connectionState === "disconnected" || connectionState === "closed";
  const canEnd = connectionState === "connected";

  const [selectedVoice, setSelectedVoice] = React.useState("Sofía");

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const voice = e.target.value;
    setSelectedVoice(voice);
    // El SDK instalado tipa las voces antiguas; la API acepta las nuevas
    updateParams({ voice: voice as never });
  };

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
        return "bg-stone-400 shadow-stone-400/50";
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
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-orange-200/40 overflow-hidden border border-orange-100 ring-1 ring-amber-900/5">
      {/* Header Bar */}
      <div className="px-6 py-4 border-b border-orange-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-amber-50/60 to-rose-50/60">
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
          <span className="font-semibold text-stone-700 text-sm tracking-wide uppercase">
            {getStatusText(connectionState)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden md:inline-block px-2.5 py-1 rounded-md bg-white/80 text-stone-500 text-xs font-medium border border-orange-100">
            Modelo: orga-1-beta
          </span>
          {/* Selector de voz */}
          <label className="flex items-center gap-2 text-xs font-medium text-stone-600">
            <span className="hidden sm:inline">Voz:</span>
            <select
              value={selectedVoice}
              onChange={handleVoiceChange}
              disabled={!canStart}
              title={
                canStart
                  ? "Elige la voz de tu compañía"
                  : "Termina la sesión para cambiar de voz"
              }
              className="px-3 py-1.5 rounded-lg bg-white border border-orange-200 text-stone-700 text-xs font-medium shadow-sm cursor-pointer hover:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-300/60 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {VOICES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="p-4 sm:p-6 md:p-8">
        {/* Main Visualizer Area */}
        <div className="relative bg-gradient-to-b from-stone-900 via-stone-900 to-amber-950 rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-video shadow-inner ring-1 ring-black/5 mb-6 md:mb-8 group">
          {connectionState === "connected" ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <WaveVisualizer stream={audioStream} />
            </div>
          ) : (
            <>
              <div className="absolute -top-1/4 left-1/4 w-2/3 h-2/3 bg-amber-500/15 rounded-full blur-[100px]" />
              <div className="absolute -bottom-1/4 right-1/4 w-2/3 h-2/3 bg-rose-500/15 rounded-full blur-[100px]" />
            </>
          )}

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center z-10">
            {!userVideoStream && connectionState !== "connected" && (
              <div className="space-y-4 md:space-y-6 max-w-md animate-in fade-in zoom-in duration-500 w-full">
                <div className="flex justify-center">
                  <VoiceOrb size={96} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    Listo para conversar
                  </h3>
                  <p className="text-stone-300 text-sm md:text-base px-2">
                    Tu voz amiga te espera. Pulsa iniciar y empieza a hablar.
                  </p>
                </div>
              </div>
            )}

            {connectionState === "connected" && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-white/90">
                  En vivo
                </span>
              </div>
            )}
          </div>

          {/* Mic Warning */}
          {connectionState === "connected" && !isMicOn && (
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 w-max max-w-[90%]">
              <div className="flex items-center gap-2 md:gap-3 bg-red-500/90 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full shadow-lg backdrop-blur-md animate-in fade-in slide-in-from-bottom-4">
                <Mic2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm font-medium truncate">
                  Micrófono desactivado
                </span>
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
              className={`group relative w-full md:w-auto min-w-[160px] inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-white transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${
                !canStart
                  ? "bg-stone-300"
                  : "bg-gradient-to-r from-amber-500 to-rose-500 hover:shadow-lg hover:shadow-rose-500/30 hover:-translate-y-0.5"
              }`}
            >
              <Play className="h-5 w-5 mr-2.5 fill-current" />
              <span>Iniciar Sesión</span>
            </button>

            <button
              onClick={() => endSession()}
              disabled={!canEnd}
              className={`w-full md:w-auto min-w-[160px] inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold transition-all border-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ${
                !canEnd
                  ? "border-stone-100 text-stone-300 bg-stone-50"
                  : "border-red-100 text-red-600 bg-red-50/50 hover:bg-red-50 hover:border-red-200"
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
                    ? "bg-amber-50 text-stone-700 ring-transparent hover:bg-amber-100"
                    : "bg-red-50 text-red-600 ring-red-100 hover:bg-red-100"
                }`}
                title={isMicOn ? "Silenciar micrófono" : "Activar micrófono"}
                aria-label={isMicOn ? "Silenciar micrófono" : "Activar micrófono"}
              >
                {isMicOn ? (
                  <Mic2 className="h-5 w-5" />
                ) : (
                  <div className="relative">
                    <Mic2 className="h-5 w-5" />
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                  </div>
                )}
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
                    ? "bg-amber-50 text-stone-700 ring-transparent hover:bg-amber-100"
                    : "bg-red-50 text-red-600 ring-red-100 hover:bg-red-100"
                }`}
                title={isMicOn ? "Silenciar micrófono" : "Activar micrófono"}
                aria-label={isMicOn ? "Silenciar micrófono" : "Activar micrófono"}
              >
                {isMicOn ? (
                  <Mic2 className="h-5 w-5" />
                ) : (
                  <div className="relative">
                    <Mic2 className="h-5 w-5" />
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <OrgaAudio stream={aiAudioStream} />
    </div>
  );
}
