import { useRef, useEffect, useState } from "react";
import Input from "../components/Input";
import { useAppContext } from "../context/useAppContext";

export default function ChatUI() {
  const { messages } = useAppContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Track user scroll behavior
  useEffect(() => {
    const container = messagesEndRef.current?.parentElement;
    if (!container) return;

    const handleScroll = () => {
      setIsUserScrolling(true);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = window.setTimeout(() => {
        setIsUserScrolling(false);
      }, 1000);
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isUserScrolling) return;

    const scrollElement = messagesEndRef.current;
    if (!scrollElement) return;

    const frame = requestAnimationFrame(() => {
      scrollElement.scrollIntoView({
        behavior: "auto",
        block: "end",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [messages, isUserScrolling]);

  return (
    <div className="flex flex-col h-[calc(100vh-73px)]">
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="flex flex-col items-center p-4 space-y-4 w-full max-w-4xl mx-auto">
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
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>
      {/* Input area */}
      <div className="w-full max-w-4xl mx-auto bg-[#292A2D] p-4 sticky bottom-0">
        <Input />
      </div>
    </div>
  );
}
