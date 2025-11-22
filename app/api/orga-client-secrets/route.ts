import { NextResponse } from "next/server";
import { OrgaAI } from "@orga-ai/node";

// Validación de variables de entorno
if (!process.env.ORGA_API_KEY) {
  throw new Error("❌ ORGA_API_KEY no configurada en .env.local");
}
if (!process.env.USER_EMAIL) {
  throw new Error("❌ USER_EMAIL no configurada en .env.local");
}

// Inicializar OrgaAI una sola vez
const orga = new OrgaAI({
  apiKey: process.env.ORGA_API_KEY,
  userEmail: process.env.USER_EMAIL,
});

export async function GET() {
  try {
    const config = await orga.getSessionConfig();
    return NextResponse.json(config, { status: 200 });
  } catch (err) {
    console.error("Failed to get session config", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
