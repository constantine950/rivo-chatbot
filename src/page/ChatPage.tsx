import { useRef, useEffect } from "react";
import Input from "../components/Input";
import { chatWithLlama } from "../services/chatWithLlama";
import { useAppContext } from "../context/useAppContext";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  isLoading?: boolean;
};

const ChatUI = () => {
  const { messages, setMessages, isLoading, setIsLoading } = useAppContext();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Add loading message for assistant
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "",
          isUser: false,
          isLoading: true,
        },
      ]);

      // Call the API
      const response = await chatWithLlama(messageText);

      // Update the assistant message with the response
      setMessages((prev) => {
        const updated = [...prev];
        const lastMessage = updated[updated.length - 1];
        if (!lastMessage.isUser) {
          lastMessage.text = response;
          lastMessage.isLoading = false;
        }
        return updated;
      });
    } catch (error) {
      console.error("Error calling Groq API:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          text: "Sorry, I couldn't process your request. Please try again.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen pt-17">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.isUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.isUser
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              } ${message.isLoading ? "opacity-70" : ""}`}
            >
              {message.isLoading ? (
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                </div>
              ) : (
                message.text
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <Input onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatUI;
