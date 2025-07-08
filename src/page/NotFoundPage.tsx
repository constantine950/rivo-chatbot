import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-73px)] items-center justify-center text-center bg-[#292A2D] text-white">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        <p className="text-gray-300 mb-8">
          The page you're looking for doesn't exist
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
