import { useRef, useEffect, useState } from "react";
import Input from "../components/Input";
import { useAppContext } from "../context/useAppContext";

export default function ChatUI() {
  const { messages } = useAppContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);

  // Scroll behavior
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

  // Format message content with consistent styling
  const formatMessageContent = (text: string): { __html: string } => {
    if (!text) return { __html: "" };

    const html = text
      .replace(/^# (.*$)/gm, '<h1 class="text-xl font-bold mt-4 mb-2">$1</h1>')
      .replace(
        /^## (.*$)/gm,
        '<h2 class="text-lg font-semibold mt-3 mb-1">$1</h2>'
      )
      .replace(
        /^### (.*$)/gm,
        '<h3 class="text-base font-medium mt-2 mb-1">$1</h3>'
      )
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(
        /`(.*?)`/g,
        '<code class="bg-[#292A2D] text-gray-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
      )
      .replace(
        /```([\s\S]*?)```/g,
        '<pre class="bg-[#292A2D] text-gray-300 p-3 rounded-md overflow-x-auto my-2"><code>$1</code></pre>'
      )
      .replace(/- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\n\n/g, '</p><p class="mt-2">')
      .replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:underline">$1</a>'
      );

    const withLists = html.replace(
      /(<li.*?>.*?<\/li>)+/gs,
      '<ul class="pl-5 space-y-1 my-2">$&</ul>'
    );

    return { __html: withLists };
  };

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
                  <div
                    className="break-words"
                    dangerouslySetInnerHTML={formatMessageContent(message.text)}
                  />
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
