import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { ChatComponent } from "./components/chat/chat.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { MessageItemComponent } from "./components/chat/message-item/message-item.component";
import { FileAttachmentComponent } from "./components/chat/file-attachment/file-attachment.component";
import { ChatInputComponent } from "./components/chat/chat-input/chat-input.component";
import { WelcomeMessageComponent } from "./components/chat/welcome-message/welcome-message.component";

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    SidebarComponent,
    MessageItemComponent,
    FileAttachmentComponent,
    ChatInputComponent,
    WelcomeMessageComponent,
  ],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
