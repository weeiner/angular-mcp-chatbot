export interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: number;
  files?: { name: string; size: number; type: string }[];
}
