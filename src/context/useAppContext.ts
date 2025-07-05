import { createContext, useContext } from "react";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  isLoading?: boolean;
};

interface ContextValue {
  messages: Message[];
  isLoading: boolean;
  handleSendMessage: (messageText: string) => Promise<void>;
}

export const AppContext = createContext<ContextValue | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
