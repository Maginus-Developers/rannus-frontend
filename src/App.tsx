import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthCallback from "./pages/AuthCallback";
// import Dashboard from "./pages/Dashboard";
// import GuildChooser from "./pages/GuildChooser";
import Home from "./pages/Home";
import { SidebarPath } from "./SideBarPathApp";
import ChooseGuild from "./pages/ChooseGuild";
import LeaderBoard from "./pages/LeaderBoard";
import HomeNavbar from "./components/HomeNavbar";
import DashboardNavbar from "./components/DashboardNavbar";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardNavbar />,
    children: SidebarPath,
  },
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
    path: "/callback",
    element: <AuthCallback />,
  },
  {
    path: "/choose-guild",
    element: <ChooseGuild />,
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
