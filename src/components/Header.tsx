import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="px-4 pt-4 pb-4 border-b-1 border-gray-700 fixed right-0 left-0">
      <nav className="flex justify-between items-center mx-auto">
        <Link to="/">
          <img className="h-7" src="./rivo.png" />
        </Link>
        <div className="h-8 w-8 text-gray-400 cursor-pointer" title="New chat">
          <ChatBubbleOvalLeftIcon />
        </div>
      </nav>
    </header>
  );
}
