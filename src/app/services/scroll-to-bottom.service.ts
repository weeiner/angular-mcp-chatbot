import { Injectable, ElementRef } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ScrollToBottomService {
  private isAtBottomSubject = new BehaviorSubject<boolean>(true);
  public isAtBottom$: Observable<boolean> =
    this.isAtBottomSubject.asObservable();

  private containerElement: HTMLElement | null = null;
  private resizeObserver: ResizeObserver | null = null;
  private mutationObserver: MutationObserver | null = null;

  setContainer(container: ElementRef<HTMLElement> | null) {
    // Clean up previous observers
    this.cleanup();

    if (!container?.nativeElement) {
      return;
    }

    this.containerElement = container.nativeElement;

    // Watch for container size changes
    this.resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        this.handleScroll();
      });
    });

    // Watch for DOM changes (new messages)
    this.mutationObserver = new MutationObserver(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Auto-scroll when new content is added (if already near bottom)
          if (this.isAtBottomSubject.value) {
            this.scrollToBottom("smooth");
          }
          this.handleScroll();
        });
      });
    });

    this.resizeObserver.observe(this.containerElement);
    this.mutationObserver.observe(this.containerElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class", "data-state"],
    });

    // Add scroll listener
    this.containerElement.addEventListener(
      "scroll",
      this.handleScroll.bind(this)
    );
    this.handleScroll();
  }

  private handleScroll() {
    if (!this.containerElement) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = this.containerElement;

    // Check if we are within 100px of the bottom
    const atBottom = scrollTop + clientHeight >= scrollHeight - 100;
    this.isAtBottomSubject.next(atBottom);
  }

  scrollToBottom(behavior: ScrollBehavior = "smooth") {
    if (!this.containerElement) {
      return;
    }

    this.containerElement.scrollTo({
      top: this.containerElement.scrollHeight,
      behavior: behavior,
    });
  }

  autoScrollOnNewMessage() {
    if (this.isAtBottomSubject.value) {
      requestAnimationFrame(() => {
        this.scrollToBottom("smooth");
      });
    }
  }

  cleanup() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }

    if (this.containerElement) {
      this.containerElement.removeEventListener(
        "scroll",
        this.handleScroll.bind(this)
      );
      this.containerElement = null;
    }
  }
}
