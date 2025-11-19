import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ChatService } from "../services/chat.service";
import { Message } from "../models/message.model";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  inputText = "";
  loading = false;
  conversationId = "";

  @ViewChild("scroll") private scrollContainer!: ElementRef;
  @ViewChild("messageInput") private messageInput!: ElementRef;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    // initialize conversationId or reuse one from localStorage/session
    const preserved = localStorage.getItem("mcp-chat-conversationId");
    this.conversationId = preserved || this.makeId();
    localStorage.setItem("mcp-chat-conversationId", this.conversationId);

    this.loadHistory();
  }

  loadHistory() {
    const key = `mcp-chat-${this.conversationId}`;
    const raw = localStorage.getItem(key);
    this.messages = raw ? JSON.parse(raw) : [];

    // Add welcome message if no history exists
    if (this.messages.length === 0) {
      this.messages.push({
        id: this.makeId(),
        role: "ai",
        text: "Hello there!\nHow can I help you today?",
        timestamp: Date.now(),
      });
    }

    setTimeout(() => this.scrollToBottom(), 0);
  }

  saveHistory() {
    const key = `mcp-chat-${this.conversationId}`;
    localStorage.setItem(key, JSON.stringify(this.messages));
  }

  async send() {
    const text = this.inputText?.trim();
    if (!text) return;

    // Remove welcome message if it exists (first message from AI)
    if (
      this.messages.length === 1 &&
      this.messages[0].role === "ai" &&
      this.messages[0].text.includes("Hello there!")
    ) {
      this.messages = [];
    }

    const userMsg: Message = {
      id: this.makeId(),
      role: "user",
      text,
      timestamp: Date.now(),
    };

    this.messages.push(userMsg);
    this.inputText = "";

    // Reset textarea height
    setTimeout(() => {
      if (this.messageInput?.nativeElement) {
        this.messageInput.nativeElement.style.height = "auto";
      }
    }, 0);

    this.saveHistory();
    this.scrollToBottom();

    this.loading = true;
    try {
      const response = await firstValueFrom(
        this.chatService.sendMessage(this.conversationId, text)
      );
      const aiMsg: Message = {
        id: this.makeId(),
        role: "ai",
        text: response || "No response",
        timestamp: Date.now(),
      };
      this.messages.push(aiMsg);
      this.saveHistory();
      setTimeout(() => this.scrollToBottom(), 50);
    } catch (err) {
      const errMsg: Message = {
        id: this.makeId(),
        role: "ai",
        text: "Error: failed to reach MCP client",
        timestamp: Date.now(),
      };
      this.messages.push(errMsg);
      this.saveHistory();
    } finally {
      this.loading = false;
    }
  }

  scrollToBottom() {
    try {
      const el = this.scrollContainer?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    } catch (e) {
      // ignore
    }
  }

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  onEnterPress(event: KeyboardEvent) {
    // Send on Enter (without Shift), new line on Shift+Enter
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  makeId() {
    return Math.random().toString(36).substring(2, 9);
  }
}
