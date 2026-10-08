# MemoryRush

A memory-card game project containing a browser implementation, an Expo mobile implementation, and an Express/Socket.IO game server.

## Current status

Academic prototype collection. The browser game includes matching and timing logic. The mobile/server branch explores real-time game coordination and Appwrite integration.

## Features and implementation

- Browser landing, game-settings, game-board, and privacy routes.
- Card flip/match handling, elapsed-time display, and score calculation.
- Expo Router mobile screens and React Native UI dependencies.
- Express game routes and Socket.IO connection setup.
- Requirements/research material alongside implementation.

## Technology

React/TypeScript, Vite, Expo/React Native, Express, Socket.IO, Appwrite, and Tailwind/NativeWind.

## Repository map

| Path | Purpose |
| --- | --- |
| [introduction-phase/concept](introduction-phase/concept) | Requirements and research |
| [introduction-phase/web](introduction-phase/web) | Browser game |
| [introduction-phase/mobile/mobile](introduction-phase/mobile/mobile) | Expo client |
| [introduction-phase/mobile/server](introduction-phase/mobile/server) | Game API and Socket.IO server |

## Local setup

The browser game is the simplest review path:

```bash
git clone https://github.com/frontend-alex/memoryRush.git
cd memoryRush/introduction-phase/web
npm install
npm run dev
```

For the mobile client, in a separate terminal:

```bash
cd introduction-phase/mobile/mobile
npm install
npm run start
```

Run that cd command from the repository root. Choose Expo's platform option for your device; native dependencies may require a compatible development build.

The game server lives in introduction-phase/mobile/server. Review src/config/appwrite.ts and the mobile connection settings before using your own Appwrite environment. The server defaults to port 3000. Its npm run dev command invokes nodemon directly on a TypeScript file; a working TypeScript execution setup is required and is not explicitly configured in that script.

## Verification

From introduction-phase/web:

```bash
npm run build
npm run lint
```

From introduction-phase/mobile/mobile:

```bash
npm run lint
npm test
```

The mobile test script is interactive/watch-based. Manually check matching rules, timers, score calculation, and multiple-client game state. These commands and real-time flows were not executed during documentation work.

## Limitations and next steps

- Each subproject has its own manifest and runtime; the root has no unified install/start script.
- Mobile/server configuration includes project-specific Appwrite settings that need local review.
- The server start script expects dist/server.js, while no build script is declared; treat server startup as a known tooling gap.
- The older C#/SQL learning narrative in this README has been replaced with the actual game layout; unrelated exercises remain in the repository.

## Code review starting points

- [introduction-phase/web/src/routes/GameBoard.tsx](introduction-phase/web/src/routes/GameBoard.tsx)
- [introduction-phase/web/src/controllers/GameController.ts](introduction-phase/web/src/controllers/GameController.ts)
- [introduction-phase/mobile/server/src/server.ts](introduction-phase/mobile/server/src/server.ts)
