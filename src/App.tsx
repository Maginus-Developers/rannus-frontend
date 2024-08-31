import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Navbar from "./components/DashboardNavbar";
import HomeNavbar from "./components/HomeNavbar";
import { AuthProvider } from "./context/AuthContext";
import Callback from "./pages/Callback";
import ChooseGuild from "./pages/ChooseGuild";
import Home from "./pages/Home";
import { SidebarPath } from "./SideBarPathApp";

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
    element: <HomeNavbar />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/callback",
    element: <Callback />,
  },
  {
    path: "/choose-guild",
    element: <ChooseGuild />,
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
