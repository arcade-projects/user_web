# 🎮 Arcade — User Web

The frontend application for **Arcade**, a real-time multiplayer game platform built around fast room-based games and social play.

This repository contains the player-facing web application: authentication, game setup, room creation/joining, real-time gameplay UI, multilingual support, and the client-side integration with the Arcade API and WebSocket gateway.

## ✨ What is Arcade?

Arcade is designed around a simple multiplayer flow:

```text
Login
  ↓
Create or Join a Room
  ↓
Choose Game Settings
  ↓
Enter the Lobby
  ↓
Play in Real Time
```

The first game integrated into the platform is **Hot Potato** — a room-based multiplayer game where players interact through a real-time WebSocket connection.

## 🧩 Features

- 🔐 Authentication and protected routes
- 👤 Player-focused account flow
- 🏠 Create and join game rooms
- 🎯 Hot Potato game flow
- ⚡ Real-time communication with Socket.IO
- 🌍 Internationalization with `next-intl`
- 🇬🇧 English, 🇫🇮 Finnish, and 🇮🇷 Persian UI support
- 📱 Responsive game interface
- 🔔 Toast notifications and client-side feedback
- 🔳 QR-code support for room sharing
- 🧭 Client-side routing with Next.js App Router
- 🍪 Browser cookie-based authentication support
- 🛡️ JWT verification for protected frontend routes

## 🏗️ Tech Stack

| Technology | Purpose |
| --- | --- |
| **Next.js 16** | React framework and application runtime |
| **React 19** | UI layer |
| **TypeScript** | Type-safe application development |
| **Tailwind CSS 4** | Styling and responsive UI |
| **Socket.IO Client** | Real-time multiplayer communication |
| **next-intl** | Internationalization |
| **jose** | JWT handling and route protection |
| **React Hook Form** | Form management |
| **React Toastify** | User notifications |
| **Lucide React / React Icons** | UI icons |
| **QRCode** | Room QR-code generation |

The current project dependencies and scripts are defined in `package.json`. fileciteturn135file0

## 📁 Project Structure

The application follows the Next.js App Router structure:

```text
user_web/
├── app/
│   ├── components/          # Shared UI components
│   ├── interfaces/          # TypeScript interfaces
│   ├── services/            # API and Socket.IO client services
│   ├── hooks/               # Reusable React hooks
│   ├── lib/                 # Client/application utilities
│   ├── (main)/              # Main authenticated application routes
│   └── ...
├── messages/                # i18n translation files
├── public/                  # Static assets
├── .env.local               # Local environment variables (not committed)
├── next.config.*            # Next.js configuration
├── postcss.config.*         # Tailwind/PostCSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

> Directory names may evolve as the application grows. Keep feature-specific logic close to its route or domain where practical.

## 🚀 Getting Started

### Requirements

- Node.js 20+
- Yarn 1.22+
- Access to a running Arcade backend for API and real-time features

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/arcade-projects/user_web.git
cd user_web
yarn install
```

### Environment variables

Create a local environment file:

```bash
cp .env.example .env.local
```

If `.env.example` is not available in your checkout, create `.env.local` and configure the API/backend values expected by the application.

> Never commit secrets, private keys, production credentials, or tokens to Git.

### Development

Start the development server:

```bash
yarn dev
```

Then open:

```text
http://localhost:3000
```

### Production build

Build the application:

```bash
yarn build
```

Run the production build locally:

```bash
yarn start
```

### Lint

Run ESLint with:

```bash
yarn lint
```

The repository currently exposes `dev`, `build`, `start`, and `lint` scripts through `package.json`. fileciteturn135file0

## 🔌 Backend Integration

The frontend communicates with the Arcade backend for authenticated API operations and real-time game functionality.

Conceptually:

```text
┌───────────────────────┐
│      user_web         │
│   Next.js / React     │
└───────────┬───────────┘
            │
      HTTP / REST API
            │
            ▼
┌───────────────────────┐
│     Arcade Backend    │
│       NestJS          │
└───────────┬───────────┘
            │
       Socket.IO
            │
            ▼
     Real-time players
```

The backend is maintained separately in the Arcade organization.

## 🎮 Hot Potato

Hot Potato is a real-time multiplayer room experience.

Typical player flow:

```text
Create / Join Room
        ↓
Select Game Settings
        ↓
Enter Room
        ↓
Connect to Socket.IO
        ↓
Wait for the game state
        ↓
Play in real time
```

Room and game state should always be treated as **server-authoritative**. The frontend is responsible for presenting state and sending valid player actions; game rules and permissions belong to the backend.

## 🌍 Internationalization

The application uses `next-intl` for localized UI content.

When adding user-facing text:

1. Add the translation key to every supported locale.
2. Use the translation hook/component instead of hard-coded UI text.
3. Keep translation keys grouped by feature.

Example:

```tsx
const t = useTranslations("CreateRoomCard");

return <button>{t("create")}</button>;
```

## 🔐 Authentication

Authentication is handled through the Arcade authentication flow and protected frontend routes.

When working on authentication:

- Never expose JWT secrets in the browser.
- Never hard-code production credentials.
- Keep protected routes protected at the application boundary.
- Treat backend authorization as the final security boundary.
- Do not assume that hiding a UI control is sufficient authorization.

## ⚡ Real-Time Architecture

Socket.IO is used for multiplayer communication.

When adding a new real-time feature, keep this separation:

```text
UI
 ↓
Game / feature hook
 ↓
Socket service
 ↓
Socket.IO
 ↓
Backend gateway
```

Prefer explicit event names and typed payloads. Avoid putting game rules directly inside presentation components.

## 🧪 Development Checklist

Before opening a pull request:

```bash
yarn lint
yarn build
```

For gameplay changes, also manually verify:

- Authentication
- Room creation
- Room joining
- Multiple players in the same room
- Socket connection/reconnection
- Game state synchronization
- Error handling
- Mobile/responsive layout
- All supported languages

## 🚢 Deployment

Production deployments are managed through **AWS Amplify** for the web application.

The deployment pipeline should build the selected Git branch/commit and publish the resulting Next.js application.

For production issues, first verify:

1. The deployed commit SHA.
2. Build logs.
3. Environment variables.
4. API connectivity.
5. WebSocket connectivity.
6. Browser console/network errors.

## 🤝 Development Guidelines

### Keep components focused

Prefer small, reusable components over large page components.

### Keep business logic out of UI where possible

API calls, socket handling, and game state transitions should live in services/hooks/domain-oriented code rather than being duplicated across components.

### Type everything

Avoid `any` when a meaningful interface or type can be defined.

### Protect the user experience

Every async operation should have sensible loading, error, and empty states.

### Don't trust the client

UI permissions are for user experience. Authorization must always be enforced by the backend.

## 📌 Current Status

Arcade is an actively developed multiplayer platform. The frontend is currently focused on the player experience and the Hot Potato game flow, with the architecture intended to support additional games over time.

---

## 📄 License

This project is currently maintained privately by the Arcade organization.

---

<p align="center">
  Built for real-time multiplayer experiences 🎮⚡
</p>
