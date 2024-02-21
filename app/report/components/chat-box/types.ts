export interface IMessage {
  content: string;
  sender: string;
  receiver: string;
  time: Date;
  role?: string;
}

export interface IChatBox {
  id: string;
  messages: IMessage[];
}
