import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function AppLayout() {
  return (
    <div className="bg-[#292A2D] h-screen">
      <div className="mx-auto">
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
