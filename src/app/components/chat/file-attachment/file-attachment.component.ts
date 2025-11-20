import { Component, Input } from "@angular/core";

@Component({
  selector: "app-file-attachment",
  templateUrl: "./file-attachment.component.html",
  styleUrls: ["./file-attachment.component.css"],
})
export class FileAttachmentComponent {
  @Input() file!: { name: string; size: number; type: string };
  @Input() removable = false;
  @Input() index?: number;

  getFileIconColor(): string {
    const type = this.file.type.toLowerCase();
    if (type.includes("pdf")) return "bg-red-500";
    if (type.includes("word") || type.includes("document"))
      return "bg-blue-500";
    if (type.includes("spreadsheet") || type.includes("excel"))
      return "bg-green-500";
    return "bg-gray-500";
  }
}
