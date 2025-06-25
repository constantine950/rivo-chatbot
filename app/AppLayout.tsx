import { Outlet } from "react-router-dom";
import Header from "../src/components/Header";

export default function AppLayout() {
  return (
    <div>
      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
}
