import { ArrowUpIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function Input() {
  const [message, setMessage] = useState("");

  return (
    <div className="relative w-full">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message Rivo"
        className="pl-4 pr-12 py-3 rounded-lg placeholder:text-gray-400 w-full bg-[#404045] outline-none text-white focus:ring-2 focus:ring-blue-500 transition-all"
      />
      <button
        type="submit"
        disabled={message.length < 3}
        className={`${
          message.length < 3
            ? "cursor-not-allowed bg-gray-400 text-[#404045]"
            : "cursor-pointer bg-blue-500 text-white"
        } absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500`}
        aria-label="Send message"
      >
        <ArrowUpIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
