import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="app-shell h-screen flex flex-col relative overflow-hidden">
      <app-sidebar [(isOpen)]="sidebarOpen"></app-sidebar>

      <!-- Header with menu button -->
      <div class="absolute top-4 left-4 z-20">
        <button
          (click)="sidebarOpen = !sidebarOpen"
          class="btn btn-circle btn-ghost"
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
      </div>

      <main class="flex-1 w-full overflow-hidden">
        <app-chat></app-chat>
      </main>
    </div>
  `,
})
export class AppComponent {
  sidebarOpen = false;
}
