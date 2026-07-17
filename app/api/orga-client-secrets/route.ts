import { NextResponse } from "next/server";
import { OrgaAI } from "@orga-ai/node";

export async function GET() {
  // Validación dentro del handler para devolver un error claro
  // en vez de romper al importar el módulo (500 opaco)
  if (!process.env.ORGA_API_KEY) {
    console.error("❌ ORGA_API_KEY no configurada en .env.local");
    return NextResponse.json(
      { error: "ORGA_API_KEY no configurada" },
      { status: 500 }
    );
  }
  try {
    // @orga-ai/node >= 1.0.0: ya no requiere userEmail
    const orga = new OrgaAI({
      apiKey: process.env.ORGA_API_KEY,
    });
    const config = await orga.getSessionConfig();
    return NextResponse.json(config, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("❌ Failed to get session config:", message);
    return NextResponse.json(
      {
        error: "Internal server error",
        // Detalle solo en desarrollo para facilitar el diagnóstico
        ...(process.env.NODE_ENV !== "production" && { detail: message }),
      },
      { status: 500 }
    );
  }
}
