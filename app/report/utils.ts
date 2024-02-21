import { IMessage } from "./components/chat-box/types";

export const chat: IMessage[] = [
  {
    content:
      "Oi, preciso falar com você sobre algo sério que está acontecendo na escola.",
    sender: "João",
    receiver: "Maria",
    time: new Date("2024-01-06T09:00:00"),
  },
  {
    content: "Claro, João. Estou aqui para ajudar. O que aconteceu?",
    sender: "Maria",
    role: "Professora",
    receiver: "João",
    time: new Date("2024-01-06T09:02:00"),
  },
  {
    content:
      "É sobre o Pedro. Ele está sendo intimidado por alguns colegas no intervalo.",
    sender: "João",
    receiver: "Maria",
    time: new Date("2024-01-06T09:05:00"),
  },
  {
    content:
      "Isso é grave. Você pode me dar mais detalhes? É importante agirmos rápido.",
    sender: "Maria",
    role: "Professora",
    receiver: "João",
    time: new Date("2024-01-06T09:07:00"),
  },
  {
    content:
      "Eles zombam dele por causa de suas roupas e o excluem dos jogos. Pedro fica muito chateado.",
    sender: "João",
    receiver: "Maria",
    time: new Date("2024-01-06T09:10:00"),
  },
  {
    content:
      "Obrigada por me contar, João. Vou conversar com os alunos e lidar com isso imediatamente.",
    sender: "Maria",
    role: "Professora",
    receiver: "João",
    time: new Date("2024-01-06T09:15:00"),
  },
];
