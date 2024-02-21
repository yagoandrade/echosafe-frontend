export const statusToColor = {
  open: {
    bg: "bg-green-200",
    text: "text-green-900",
  },
  under_review: {
    bg: "bg-yellow-200",
    text: "text-yellow-900",
  },
  resolved: {
    bg: "bg-gray-200",
    text: "text-gray-900",
  },
  waiting: {
    bg: "bg-red-200",
    text: "text-red-900",
  },
};

export const statusLabel = {
  open: "Em Aberto",
  under_review: "Pendente",
  waiting: "Não resolvido",
  resolved: "Resolvido",
};
