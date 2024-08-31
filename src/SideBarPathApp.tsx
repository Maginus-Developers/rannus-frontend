import HomesPage from "./pages/Homes/Dashboard";
import WelcomeChannel from "./pages/WelcomeChannel";
import { IconHome, IconWaveSine } from "@tabler/icons-react";
import { RouteObjectWithMeta } from "./types";

export const SidebarPath: RouteObjectWithMeta[] = [
  {
    path: "/dashboard",
    element: <HomesPage />,
    icon: <IconHome />,
    name: "Dashboard",
  },
  {
    path: "/dashboard/profile/:username/:guild",
    element: <div>Profile</div>,
    icon: <IconHome />,
    name: "Profile",
    getUrl: () => {
      return "/profile/username/guild";
    },
  },
  {
    path: "/dashboard/welcome",
    element: <WelcomeChannel></WelcomeChannel>,
    icon: <IconWaveSine />,
    name: "Welcome",
  },
];
