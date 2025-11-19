import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="app-shell min-h-screen flex flex-col">
      <main class="flex-1 max-w-5xl mx-auto w-full px-4 py-6">
        <app-chat></app-chat>
      </main>
    </div>
  `,
})
export class AppComponent {}
