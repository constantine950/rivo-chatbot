import { ArrowUpIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";

export default function Input() {
  const { handleSendMessage, isLoading } = useAppContext();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (message.trim().length < 1 || isLoading) return;
    handleSendMessage(message);
    setMessage("");
    navigate("/chat");
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSubmit()}
        placeholder="Message Rivo"
        disabled={isLoading}
        className="pl-4 pr-12 py-3 rounded-lg placeholder:text-gray-400 w-full bg-[#404045] outline-none text-white focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-70"
      />
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={message.trim().length < 1 || isLoading}
        className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          message.trim().length < 1 || isLoading
            ? "cursor-not-allowed bg-gray-400 text-[#404045]"
            : "cursor-pointer bg-blue-500 text-white hover:bg-blue-600"
        }`}
        aria-label="Send message"
      >
        <ArrowUpIcon className="h-5 w-5" />
      </button>
    </form>
  );
}
