"use client";

import { useEffect, useRef } from "react";

interface WaveVisualizerProps {
  stream: MediaStream | null;
  className?: string;
}

export default function WaveVisualizer({
  stream,
  className = "",
}: WaveVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Audio Context Setup
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let source: MediaStreamAudioSourceNode | null = null;
    let dataArray: Uint8Array | null = null;

    if (stream) {
      // Initialize Audio Context only if stream exists
      audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      // Resume context if suspended
      if (audioContext.state === "suspended") {
        audioContext.resume();
      }

      analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const audioTracks = stream.getAudioTracks();
      if (audioTracks.length > 0) {
        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        sourceRef.current = source;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
      }
    }

    const draw = () => {
      if (!canvas || !ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      // Get audio data if available
      let volume = 0;
      if (analyser && dataArray) {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        volume = sum / dataArray.length / 255;
      }

      ctx.clearRect(0, 0, width, height);

      // Central Glow
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Draw Glow (always visible but pulses with volume)
      const glowRadius = 100 + volume * 100 + Math.sin(Date.now() * 0.002) * 10;
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        glowRadius
      );
      gradient.addColorStop(0, "rgba(6, 182, 212, 0.8)"); // Cyan-500
      gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.2)");
      gradient.addColorStop(1, "rgba(6, 182, 212, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Waves
      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(165, 243, 252, 0.6)"; // Cyan-200
      ctx.beginPath();

      const bufferLength = analyser ? analyser.frequencyBinCount : 128;
      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        let v = 0;
        let waveHeight = 0;

        if (dataArray) {
           v = dataArray[i] / 128.0;
           waveHeight = (dataArray[i] / 255) * 50;
        } else {
           // Idle wave simulation
           v = 1;
           waveHeight = 5;
        }

        // Mirror the wave vertically around the center
        const yOffset = centerY;
        
        // Smooth curve
        if (i === 0) {
          ctx.moveTo(x, yOffset);
        } else {
          // Sine wave modulation
          const frequency = 0.2;
          const speed = 0.005;
          const idleWave = Math.sin(i * frequency + Date.now() * speed) * (waveHeight + 10);
          
          const waveY = centerY + idleWave;
           ctx.lineTo(x, waveY);
        }

        x += sliceWidth * 2; // Stretch horizontally
      }

      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Additional decorative lines
      ctx.beginPath();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.3)";
      ctx.lineWidth = 1;
      
      for (let i = 0; i < 3; i++) {
         const offset = (i + 1) * 20;
         ctx.moveTo(0, centerY);
         
         for (let j = 0; j < width; j+=10) {
             const waveY = centerY + Math.sin(j * 0.02 + Date.now() * (0.002 + i * 0.001)) * (20 + volume * 50);
             ctx.lineTo(j, waveY);
         }
         ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    // Resize observer to handle canvas sizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        canvas.width = entry.contentRect.width;
        canvas.height = entry.contentRect.height;
      }
    });
    resizeObserver.observe(canvas);

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContext) {
        audioContext.close();
      }
      resizeObserver.disconnect();
    };
  }, [stream]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      width={800}
      height={450}
    />
  );
}
