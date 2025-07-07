import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="px-4 py-4 border-b border-gray-700 fixed top-0 right-0 left-0 h-[73px] bg-[#292A2D] z-10">
      <nav className="flex justify-between items-center max-w-4xl mx-auto">
        <Link to="/">
          <img className="h-7" src="./rivo.png" alt="Logo" />
        </Link>
        <div className="h-8 w-8 text-gray-400 cursor-pointer" title="New chat">
          <ChatBubbleOvalLeftIcon />
        </div>
      </nav>
    </header>
  );
}
