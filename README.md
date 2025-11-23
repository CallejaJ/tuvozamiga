# Orga AI - Real-time AI Interface Demo

A Next.js application showcasing real-time AI video and audio processing capabilities powered by Orga AI SDK.

## 🚀 Features

- **Real-time Video & Audio Processing**: Experience seamless AI interactions with ultra-low latency
- **Live Microphone Controls**: Toggle microphone during active sessions
- **Connection State Management**: Visual feedback for connection status (disconnected, connecting, connected)
- **Modern UI/UX**: Beautiful, responsive interface built with Tailwind CSS, fully translated to Spanish
- **Edge Deployment Ready**: Optimized for global edge networks

## 📦 Tech Stack

- **Framework**: [Next.js 16.0.3](https://nextjs.org/)
- **UI Library**: [React 19.2.0](https://react.dev/)
- **Styling**: [Tailwind CSS 4.1.9](https://tailwindcss.com/)
- **AI SDK**: [@orga-ai/react](https://docs.orga-ai.com/) & @orga-ai/node
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## 🏗️ Project Structure

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

## 🛠️ Installation

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

## 🎯 Key Components

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

## 🎨 UI Components

The interface includes:

- **Hero Section**: Gradient background with call-to-action buttons
- **Features Grid**: Showcasing key capabilities (low latency, security, edge deployment)
- **Interactive Demo**: Full-featured video conference interface
- **Status Indicators**: Real-time connection state visualization

## 📝 Scripts

```json
{
  "dev": "next dev", // Start development server
  "build": "next build", // Build for production
  "start": "next start", // Start production server
  "lint": "eslint ." // Run ESLint
}
```

## 🚀 Deployment

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

## 🔧 API Endpoints

### `/api/orga-client-secrets`

This endpoint should return session configuration for the Orga AI client. Example implementation:

```typescript
export async function GET() {
  // Return session configuration
  return Response.json({
    apiKey: process.env.ORGA_API_KEY,
    // Additional config...
  });
}
```

## 🎯 Usage Guide

1. **Starting a Session**

   - Click "Iniciar Sesión" button
   - Allow microphone access when prompted
   - Wait for connection to establish (status indicator turns green)

2. **During Session**

   - Speak naturally to interact with the AI
   - Toggle microphone as needed
   - Monitor connection status indicator

3. **Ending Session**
   - Click "Terminar Sesión" to terminate
   - Resources are automatically cleaned up

## 🔐 Security Features

- End-to-end encryption for all streams
- No data storage - privacy by design
- Secure session token management
- Environment variable protection for API keys

## 📊 Performance

- Optimized for ultra-low latency communication
- Edge deployment ready
- Efficient resource management
- Automatic reconnection handling

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Orga AI Documentation](https://docs.orga-ai.com/docs/server-sdks/node/quick-start)
- [Live Demo](https://orga-ai-api.vercel.app)
- [GitHub Repository](https://github.com/CallejaJ/orga-ai-api)

## 💡 Support

For issues and questions:

- Open an issue on GitHub
- Check the [Orga AI documentation](https://docs.orga-ai.com)
- Contact support at support@orga-ai.com

---

Built with ❤️ using Orga AI SDK
