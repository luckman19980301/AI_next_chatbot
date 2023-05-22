import { auth } from "@/auth";
import { OpenAIStream, openai } from "@/lib/openai";
import { prisma } from "@/lib/prisma";

export const runtime = "edge";

export const POST = auth(async function POST(req: Request) {
  const json = await req.json();
  console.log(req.auth);

  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: json.messages,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    max_tokens: 500,
    n: 1,
    stream: true,
  });

  const stream = await OpenAIStream(res);

  let fullResponse = "";
  const decoder = new TextDecoder();
  const saveToPrisma = new TransformStream({
    transform: async (chunk, controller) => {
      controller.enqueue(chunk);
      fullResponse += decoder.decode(chunk);
    },
    flush: async () => {
      await prisma.chat.upsert({
        where: {
          id: json.id,
        },
        create: json,
        update: json,
      });
    },
  });

  return new Response(stream.pipeThrough(saveToPrisma), {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
});
