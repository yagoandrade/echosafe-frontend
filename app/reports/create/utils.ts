export interface Input {
  title: string;
  placeholder: string;
  key: string;
}

export type InputKey =
  | "what-happened"
  | "were-you-the-victim"
  | "names-of-people-who-can-reinforce-the-report";

export type TimeInputKey = "start-time" | "end-time";

export interface Inputs extends Record<InputKey, Input> {
  time?: Record<TimeInputKey, Input>;
}

export const inputs: Inputs = {
  "what-happened": {
    title: "O que aconteceu?",
    placeholder: "Resuma o evento que aconteceu",
    key: "details",
  },
  "were-you-the-victim": {
    title: "Você foi a vítima?",
    placeholder: "Selecione uma opção",
    key: "isVictim",
  },
  /*
    TODO: Rehabilitar quando refatorarmos esse módulo de data e hora do acontecimento para pegar a data e hora de forma separada
  time: {
    "start-time": {
      title: "Horário do início do acontecimento",
      placeholder: "Selecione a hora",
      key: "receivedDate",
    },
    "end-time": {
      title: "Horário do fim do acontecimento",
      placeholder: "Selecione a hora",
      key: "receivedEndDate",
    },
  }, */
  "names-of-people-who-can-reinforce-the-report": {
    title: "Insira o nome de até 3 pessoas que possam reforçar a denúncia",
    placeholder: "Insira o nome da pessoa",
    key: "endosers",
  },
};
