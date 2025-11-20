import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-chat-input",
  templateUrl: "./chat-input.component.html",
  styleUrls: ["./chat-input.component.css"],
})
export class ChatInputComponent {
  @Input() loading = false;
  @Input() selectedFiles: File[] = [];
  @Output() sendMessage = new EventEmitter<{
    text: string;
    files: File[];
  }>();
  @Output() removeFile = new EventEmitter<number>();
  @Output() filesSelected = new EventEmitter<File[]>();

  @ViewChild("messageInput") messageInput!: ElementRef;

  inputText = "";

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const newFiles = Array.from(input.files);
      this.filesSelected.emit(newFiles);
      input.value = "";
    }
  }

  onRemoveFile(index: number) {
    this.removeFile.emit(index);
  }

  send() {
    const text = this.inputText?.trim();
    if (!text && this.selectedFiles.length === 0) return;

    this.sendMessage.emit({
      text: text || "",
      files: [...this.selectedFiles],
    });

    this.inputText = "";

    // Reset textarea height
    setTimeout(() => {
      if (this.messageInput?.nativeElement) {
        this.messageInput.nativeElement.style.height = "auto";
      }
    }, 0);
  }

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  }

  onEnterPress(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }
}
