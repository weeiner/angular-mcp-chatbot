import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="h-screen flex overflow-hidden">
      <app-sidebar
        [(isOpen)]="sidebarOpen"
        (newChat)="startNewChat()"
      ></app-sidebar>

      <div
        class="flex-1 flex flex-col overflow-hidden transition-all duration-300"
      >
        <!-- Header with menu and new chat buttons -->
        <div class="w-full p-4 flex items-center gap-2">
          <button
            (click)="sidebarOpen = !sidebarOpen"
            class="btn btn-circle btn-ghost transition-opacity duration-300"
            [class.opacity-0]="sidebarOpen"
            [class.pointer-events-none]="sidebarOpen"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          <button
            (click)="startNewChat()"
            class="btn btn-circle btn-ghost transition-opacity duration-300"
            [class.opacity-0]="sidebarOpen"
            [class.pointer-events-none]="sidebarOpen"
            title="New chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-6 h-6 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </button>
        </div>

        <main class="flex-1 w-full overflow-hidden">
          <app-chat></app-chat>
        </main>
      </div>
    </div>
  `,
})
export class AppComponent {
  sidebarOpen = false;

  startNewChat() {
    // TODO: Implement new chat functionality
    console.log("Starting new chat...");
  }
}
