# angular-mcp-chatbot

Angular frontend for MCP client (MVP)

Features

- Angular + TailwindCSS + DaisyUI
- Chat UI with localStorage per conversation
- Sends messages to MCP client via POST /chat

Quick start

1. Install dependencies:

```bash
npm install
```

2. Start dev server:

```bash
npm start
```

Notes

- Configure MCP client URL in `src/environments/environment.ts` (mcpUrl).
- This project is an MVP frontend and expects an MCP client that accepts `POST /chat` with body `{ message, conversationId }` and returns `{ response }`.
