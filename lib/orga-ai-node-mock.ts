// This file simulates the @orga-ai/node SDK for backend use
// It allows the API route to look exactly like production code

export class OrgaAI {
  private apiKey: string
  private userEmail: string

  constructor(config: { apiKey: string; userEmail: string }) {
    this.apiKey = config.apiKey
    this.userEmail = config.userEmail
    console.log("[OrgaAI Node SDK] Initialized for:", this.userEmail)
  }

  async getSessionConfig() {
    console.log("[OrgaAI Node SDK] Fetching session config from Orga Cloud...")

    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!this.apiKey) {
      throw new Error("Missing API Key")
    }

    // Return the structure documented in the architecture
    return {
      ephemeralToken: "mock-ephemeral-token-" + Math.random().toString(36).substring(7),
      iceServers: [
        {
          urls: ["stun:stun.l.google.com:19302"],
        },
      ],
    }
  }
}
