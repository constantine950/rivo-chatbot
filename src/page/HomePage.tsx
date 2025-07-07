import Input from "../components/Input";

export default function HomePage() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="mx-auto w-full max-w-md px-4">
        <div className="text-white mb-6">
          <h1 className="text-2xl font-medium">Hi, I'm Rivo</h1>
          <p className="mt-2 text-gray-300">How can I help you today?</p>
        </div>
        <Input />
      </div>
    </div>
  );
}
