import { useRef, useEffect } from "react";
import Input from "../components/Input";
import { useAppContext } from "../context/useAppContext";

export default function ChatUI() {
  const { messages } = useAppContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen pt-17">
      {/* Messages container - centered */}
      <div className="flex-1 overflow-y-auto flex flex-col items-center p-4 space-y-4 w-full max-w-4xl mx-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`w-full flex ${
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
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              ) : (
                <p className="break-words">{message.text}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area - centered */}
      <div className="p-4 w-full max-w-4xl mx-auto">
        <Input />
      </div>
    </div>
  );
}
