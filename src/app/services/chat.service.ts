import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({ providedIn: "root" })
export class ChatService {
  private base = environment.mcpClientURL || "";

  constructor(private http: HttpClient) {}

  sendMessage(conversationId: string, message: string): Observable<string> {
    const url = this.base.replace(/\/$/, "") + "/chat";
    const body = { message, conversationId };
    return this.http
      .post<{ response: string }>(url, body)
      .pipe(map((r) => r?.response || ""));
  }
}
