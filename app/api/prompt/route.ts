import OpenAI from "openai";

const openai = new OpenAI();

type RequestData = {
  currentModel: string;
  message: string;
};

export async function POST(request: Request) {
  const { message } = (await request.json()) as RequestData;

  if (!message) {
    return new Response("No message in the request", { status: 400 });
  }

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: message }],
    max_tokens: 4096,
    model: "gpt-3.5-turbo-1106",
  });

  return new Response(completion.choices[0].message.content, { status: 200 });
}
