export interface IMessageStyle {
  variant: "sender" | "receiver";
  children: React.ReactNode;
  role?: string;
  sender?: string;
}
