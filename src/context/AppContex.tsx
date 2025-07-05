import React, { useState } from "react";
import { AppContext } from "./useAppContext";
import { chatWithLlama } from "../services/chatWithLlama";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  isLoading?: boolean;
};

const initialstate: Message[] = [
  {
    id: 1,
    text: "Hey there! How can I help you today?",
    isUser: false,
  },
];

type ChildrenProp = {
  children: React.ReactNode;
};

export default function AppProvider({ children }: ChildrenProp) {
  const [messages, setMessages] = useState<Message[]>(initialstate);
  const [isLoading, setIsLoading] = useState(false);

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

  const value = {
    messages,
    isLoading,
    handleSendMessage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
