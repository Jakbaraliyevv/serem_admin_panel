import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "../components/dashboard";

function Layout1() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout1;
