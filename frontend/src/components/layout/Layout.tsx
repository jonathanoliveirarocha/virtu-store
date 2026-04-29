import { Outlet } from "react-router-dom";
import Header from "@/components/shared/Header";

const Layout = () => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
