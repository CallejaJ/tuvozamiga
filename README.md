# TUVOZAMIGA - Virtual Companion

A web application designed to combat loneliness by providing a friendly voice and active listening powered by AI.

> **Note:** For the best experience, the use of headphones is recommended.

## Features

- **Always Available**: 24/7 companionship with ultra-low latency.
- **Microphone Control**: You decide when to speak.
- **Connection Status**: Clear visual feedback on your companion's status.
- **Friendly Interface**: Warm and welcoming design.
- **Empathetic Listening**: AI designed to understand and accompany.

## Tech Stack

- **Framework**: [Next.js 16.0.3](https://nextjs.org/)
- **UI Library**: [React 19.2.0](https://react.dev/)
- **Styling**: [Tailwind CSS 4.1.9](https://tailwindcss.com/)
- **AI SDK**: @orga-ai/react & @orga-ai/node
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## Project Structure

```
orga-ai-api/
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main landing page with demo
│   ├── globals.css          # Global styles
│   ├── providers/
│   │   ├── OrgaClientProvider.tsx    # Client-side provider wrapper
│   │   └── OrgaProviderClient.tsx    # Orga AI initialization
│   └── api/
│       └── orga-client-secrets/      # API endpoint for session config
├── public/                  # Static assets
├── package.json            # Dependencies and scripts
├── next.config.mjs         # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/CallejaJ/orga-ai-api.git
   cd orga-ai-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   ORGA_API_KEY=your_orga_api_key_here
   NEXT_PUBLIC_ORGA_MODEL=orga-1-beta
   NEXT_PUBLIC_ORGA_VOICE=nova
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Key Components

### OrgaAI Provider Setup

The application uses a client-side provider pattern to initialize Orga AI:

```typescript
// app/providers/OrgaProviderClient.tsx
OrgaAI.init({
  logLevel: "info",
  sessionConfigEndpoint: "/api/orga-client-secrets",
  model: "orga-1-beta",
  voice: "nova",
});
```

### Demo Component Features

The main demo component (`DemoComponent`) provides:

- Session management (start/end)
- Real-time connection status
- Camera and microphone toggles
- Video stream display
- Audio stream processing

### Available Hooks

The `useOrgaAI()` hook provides:

- `startSession()` - Initialize AI session
- `endSession()` - Terminate current session
- `connectionState` - Current connection status
- `userVideoStream` - User's video MediaStream
- `aiAudioStream` - AI audio MediaStream
- `toggleMic()` - Enable/disable microphone

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel Dashboard
3. Configure environment variables
4. Set Node.js version to 22.x (recommended)
5. Deploy

### Configuration Notes

- Node.js version: 22.x recommended
- TypeScript errors are ignored in build (`ignoreBuildErrors: true`)
- Images are unoptimized for faster builds

## API Endpoints

### `/api/orga-client-secrets`

This endpoint should return session configuration for the Orga AI client.

## Security Features

- End-to-end encryption for all streams
- No data storage - privacy by design
- Secure session token management
- Environment variable protection for API keys

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Links

- [Orga AI Documentation](https://docs.orga-ai.com/tutorials)
- [GitHub Repository](https://github.com/CallejaJ/tuvozamiga)

---

Built using Orga AI SDK
