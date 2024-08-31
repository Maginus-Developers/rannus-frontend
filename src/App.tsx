import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/DashboardNavbar";
import { SidebarPath } from "./SideBarPathApp";
import HomePage from "./pages/Homes/HomePage";
import Callback from "./pages/Callback";
import ChooseGuild from "./pages/ChooseGuild";
import { AuthProvider } from "./context/AuthContext";
import HomeNavbar from "./components/HomeNavbar";
import Leaderboard from "./pages/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Navbar />,
    children: [
      {
        path: "about",
        element: <div>About</div>,
      },

      ...SidebarPath,
    ],
  },
  {
    path: "/",
    element: <HomeNavbar></HomeNavbar>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/leaderboard/:guildId",
        element: <Leaderboard />,
      },
    ],
  },
  {
    path: "/callback",
    element: <Callback></Callback>,
  },
  {
    path: "/choose-guild",
    element: <ChooseGuild></ChooseGuild>,
  },
]);

function App() {
  return (
    <div>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
