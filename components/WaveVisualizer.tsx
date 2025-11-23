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
    if (!stream || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize Audio Context
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyserRef.current = analyser;

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    sourceRef.current = source;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!canvas || !ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, width, height);

      // Central Glow
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Calculate average volume for glow intensity
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
      }
      const average = sum / bufferLength;
      const volume = average / 255; // 0 to 1

      // Draw Glow
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        10,
        centerX,
        centerY,
        100 + volume * 100
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

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        // Mirror the wave vertically around the center
        const yOffset = centerY;
        
        // Smooth curve
        if (i === 0) {
          ctx.moveTo(x, yOffset);
        } else {
          // Simple sine wave modulation based on frequency data
          const waveHeight = (dataArray[i] / 255) * 50;
          const waveY = centerY + Math.sin(i * 0.2 + Date.now() * 0.005) * waveHeight;
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
      if (audioContextRef.current) {
        audioContextRef.current.close();
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
