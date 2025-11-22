import { NextResponse } from "next/server"
import { OrgaAI } from "@/lib/orga-ai-node-mock"

// This route mimics the backend setup described in the documentation
// In a real app, you would use the @orga-ai/node SDK here

export async function GET() {
  try {
    const orga = new OrgaAI({
      apiKey: process.env.ORGA_API_KEY || "mock_key_for_demo",
      userEmail: process.env.USER_EMAIL || "demo@example.com",
    })

    const config = await orga.getSessionConfig()

    return NextResponse.json(config)
  } catch (error) {
    console.error("Orga error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
