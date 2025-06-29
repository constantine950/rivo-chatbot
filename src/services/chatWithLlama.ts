interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqChatCompletionRequest {
  model: string;
  messages: GroqMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface GroqErrorResponse {
  error?: {
    message?: string;
    type?: string;
    code?: string;
  };
}

interface GroqChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: GroqMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function chatWithLlama(prompt: string): Promise<string> {
  const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
  const MODEL_NAME = "gemma2-9b-it";

  const requestBody: GroqChatCompletionRequest = {
    model: MODEL_NAME,
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
    temperature: 0.7,
    max_tokens: 1024,
  };

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorData: GroqErrorResponse = await response.json();
      throw new Error(
        errorData.error?.message ||
          `API request failed with status ${response.status}`
      );
    }

    const data: GroqChatCompletionResponse = await response.json();

    if (!data.choices?.[0]?.message?.content) {
      throw new Error("No response content in API response");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Groq API Error:", error);

    // Type-safe error handling
    if (error instanceof Error) {
      throw new Error(`Groq API request failed: ${error.message}`);
    }
    throw new Error("Unknown error occurred while calling Groq API");
  }
}
