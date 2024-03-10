const useGPTAnalysis = () => {
  const predefinedMessages = {
    sentiment:
      "Categorize a partir da mensagem a seguir como o aluno se sentiu ao descrever a situação de bullying passada: ",
    category:
      "Categorize a partir da mensagem a seguir qual o tipo de bullying a ofensa se dá: ",
    orientation:
      "A partir da mensagem a seguir, diga à escola quais orientações podem ser seguidas para resolver esse caso em um texto corrido: ",
  };
  const getAnalysis = async (
    description: string,
    analysis: "sentiment" | "category" | "orientation"
  ) => {
    const response = await fetch("/api/prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `${predefinedMessages[analysis]} ${description}`,
      }),
    });

    if (!response.ok) {
      console.error("Erro ao analisar a denúncia");
      return;
    }
    const data = await response.text();
    return data;
  };
  return { getAnalysis };
};

export default useGPTAnalysis;
