import React, { useState } from "react";
import { AppContext } from "./useAppContext";

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

  const value = {
    messages,
    setMessages,
    isLoading,
    setIsLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
