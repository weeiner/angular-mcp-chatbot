import { Component, ViewChild } from "@angular/core";
import { ChatComponent } from "./components/chat/chat.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  @ViewChild("chatComponent") chatComponent!: ChatComponent;
  sidebarOpen = false;

  startNewChat() {
    if (this.chatComponent) {
      this.chatComponent.resetChat();
    }
  }
}
