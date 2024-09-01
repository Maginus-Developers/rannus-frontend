import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard";
import GuildChooser from "./pages/GuildChooser";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/callback",
    element: <AuthCallback />,
  },
  {
    path: "/dashboard",
    element: <GuildChooser />,
  },
  {
    path: "/guild/:guildId",
    element: <Dashboard />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
