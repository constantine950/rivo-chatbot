import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function AppLayout() {
  return (
    <div className="bg-[#292A2D] h-screen">
      <Header />
      <main className="h-full pt-[73px]">
        <Outlet />
      </main>
    </div>
  );
}
