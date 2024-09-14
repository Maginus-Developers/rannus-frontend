import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthCallback from "./pages/AuthCallback";
// import Dashboard from "./pages/Dashboard";
// import GuildChooser from "./pages/GuildChooser";
import Home from "./pages/Home";
import { SidebarPath } from "@/SideBarPath";
import ChooseGuild from "./pages/ChooseGuild";
import LeaderBoard from "./pages/LeaderBoard";
import HomeNavbar from "./components/HomeNavbar";
import DashboardNavbar from "./components/DashboardNavbar";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeNavbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/leaderboard/:guildId",
        element: <LeaderBoard />,
      },
    ],
  },
  {
    path: "/",
    element: <AuthProvider />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardNavbar />,
        children: SidebarPath,
      },
      {
        path: "/choose-guild",
        element: <ChooseGuild />,
      },
    ],
  },
  {
    path: "/callback",
    element: <AuthCallback />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
