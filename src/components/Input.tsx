import { ArrowUpIcon } from "@heroicons/react/20/solid";

export default function Input() {
  return (
    <div className="relative w-full">
      <input
        placeholder="Message Rivo"
        className="pl-4 pr-12 py-3 rounded-lg placeholder:text-gray-400 w-full bg-[#404045] outline-none text-white focus:ring-2 focus:ring-blue-500 transition-all"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2 bg-gray-400 hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Send message"
      >
        <ArrowUpIcon className="h-5 w-5 text-[#404045]" />
      </button>
    </div>
  );
}
