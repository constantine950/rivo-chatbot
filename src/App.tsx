import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./page/AppLayout";
import ChatPage from "./page/chatPage";
import NotFoundPage from "./page/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AppLayout />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
