import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from "@angular/core";
import { firstValueFrom } from "rxjs";
import { ChatService } from "../../services/chat.service";
import { ScrollToBottomService } from "../../services/scroll-to-bottom.service";
import { Message } from "../../models/message.model";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  messages: Message[] = [];
  loading = false;
  conversationId = "";
  isAtBottom$ = this.scrollService.isAtBottom$;
  selectedFiles: File[] = [];

  @ViewChild("scroll") private scrollContainer!: ElementRef;

  constructor(
    private chatService: ChatService,
    public scrollService: ScrollToBottomService
  ) {}

  ngOnInit(): void {
    // initialize conversationId or reuse one from localStorage/session
    const preserved = localStorage.getItem("mcp-chat-conversationId");
    this.conversationId = preserved || this.makeId();
    localStorage.setItem("mcp-chat-conversationId", this.conversationId);

    this.loadHistory();
  }

  ngAfterViewInit(): void {
    // Initialize the scroll service with our container
    this.scrollService.setContainer(this.scrollContainer);

    // Initial scroll to bottom
    setTimeout(() => {
      this.scrollService.scrollToBottom("auto");
    }, 0);
  }

  ngOnDestroy(): void {
    // Clean up observers
    this.scrollService.cleanup();
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
  }

  saveHistory() {
    const key = `mcp-chat-${this.conversationId}`;
    localStorage.setItem(key, JSON.stringify(this.messages));
  }

  async handleSendMessage(event: { text: string; files: File[] }) {
    const text = event.text?.trim();
    if (!text && event.files.length === 0) return;

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
      text: text || "",
      timestamp: Date.now(),
      files:
        event.files.length > 0
          ? event.files.map((f) => ({
              name: f.name,
              size: f.size,
              type: f.type,
            }))
          : undefined,
    };

    this.messages.push(userMsg);
    this.saveHistory();

    // Clear files
    this.selectedFiles = [];

    // Force scroll to bottom after user message
    setTimeout(() => {
      this.scrollService.scrollToBottom("smooth");
    }, 100);

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

      // Force scroll to bottom after AI response
      setTimeout(() => {
        this.scrollService.scrollToBottom("smooth");
      }, 100);
    } catch (err) {
      const errMsg: Message = {
        id: this.makeId(),
        role: "ai",
        text: "Error: failed to reach MCP client",
        timestamp: Date.now(),
      };
      this.messages.push(errMsg);
      this.saveHistory();

      // Force scroll to bottom after error message
      setTimeout(() => {
        this.scrollService.scrollToBottom("smooth");
      }, 100);
    } finally {
      this.loading = false;
    }
  }

  scrollToBottom() {
    this.scrollService.scrollToBottom("smooth");
  }

  handleFilesSelected(files: File[]) {
    this.selectedFiles.push(...files);
  }

  makeId() {
    return Math.random().toString(36).substring(2, 9);
  }

  resetChat() {
    // Generate new conversation ID
    this.conversationId = this.makeId();
    localStorage.setItem("mcp-chat-conversationId", this.conversationId);

    // Clear messages and show welcome message
    this.messages = [
      {
        id: this.makeId(),
        role: "ai",
        text: "Hello there!\nHow can I help you today?",
        timestamp: Date.now(),
      },
    ];

    // Save the new chat state
    this.saveHistory();

    // Clear files
    this.selectedFiles = [];

    // Scroll to top
    setTimeout(() => {
      this.scrollService.scrollToBottom("auto");
    }, 100);
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }
}
