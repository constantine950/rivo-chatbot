import { useState, useRef, useEffect } from "react";
import Input from "../components/Input";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
};

const initialstate: Message[] = [
  {
    id: 1,
    text: "Hey there! How can I help you today?",
    isUser: false,
  },
];

const ChatUI = () => {
  const [messages, setMessages] = useState(initialstate);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <Input />
    </div>
  );
};

export default ChatUI;
