import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./page/AppLayout";
import ChatPage from "./page/ChatPage";
import NotFoundPage from "./page/NotFoundPage";
import HomePage from "./page/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
