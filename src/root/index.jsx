import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import BenzinTurlari from "../components/benzin-turlari";
import Layout1 from "../outlet";
import Dashboard from "../components/dashboard";

export const root = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/dashboard",
    element: <Layout1 />, // Dashboard ichida Outlet ishlatilgan Layout qo'yildi
    children: [
      {
        index: true, // ✅ To‘g‘ri: "/dashboard/benzin-turlari" bo'ladi
        element: <Dashboard />,
      },
      {
        path: "benzin-turlari", // ✅ To‘g‘ri: "/dashboard/benzin-turlari" bo'ladi
        element: <BenzinTurlari />,
      },
    ],
  },
]);
