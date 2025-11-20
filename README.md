# Angular MCP Chatbot

A modular Angular frontend for connecting to any MCP (Model Context Protocol) client. This UI can work with any MCP client that interfaces with Gemini API or other LLMs.

## Features

- Modern UI with Angular + TailwindCSS + DaisyUI
- Chat interface with conversation management
- Local storage for conversation history
- File attachment support
- Modular design - works with any MCP client

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Your MCP Client URL

This application is designed to work with **any MCP client** you've built. Update the configuration files with your MCP client's URL:

**For Development:**
Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  mcpClientURL: "http://localhost:3000", // Replace with your MCP client URL
};
```

**For Production:**
Edit `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  mcpClientURL: "https://your-mcp-client-url.com", // Replace with your production URL
};
```

### 3. Start Development Server

```bash
npm start
```

The app will be available at `http://localhost:4200`

### 4. Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## MCP Client Requirements

Your MCP client must expose a REST API with the following endpoint:

### `POST /chat`

**Request Body:**

```json
{
  "message": "User message text",
  "conversationId": "unique-conversation-id"
}
```

**Response:**

```json
{
  "response": "AI response text"
}
```

The frontend will automatically:

- Send user messages to your MCP client
- Display the AI's response in the chat
- Maintain conversation context using `conversationId`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── chat/              # Main chat interface
│   │   │   ├── chat-input/    # Message input component
│   │   │   ├── file-attachment/ # File upload component
│   │   │   ├── message-item/  # Individual message display
│   │   │   └── welcome-message/ # Welcome screen
│   │   └── sidebar/           # Conversation sidebar
│   ├── services/
│   │   ├── chat.service.ts    # Handles API communication
│   │   └── scroll-to-bottom.service.ts
│   └── models/
│       └── message.model.ts   # Message data structure
└── environments/
    ├── environment.ts         # Development config
    └── environment.prod.ts    # Production config
```

## Customization

### Styling

- TailwindCSS classes are used throughout
- DaisyUI components provide the base theme
- Customize colors and styles in `tailwind.config.cjs`

### API Integration

- All API calls are handled in `src/app/services/chat.service.ts`
- Modify this service if your MCP client has different API requirements

## Contributing

This is an MVP frontend designed to be modular and work with any MCP client implementation. Feel free to extend and customize it for your needs.

## Future Features

Login system to keeptrack of past chats.
