import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();

  closeSidebar() {
    this.isOpen = false;
    this.isOpenChange.emit(this.isOpen);
  }
}
