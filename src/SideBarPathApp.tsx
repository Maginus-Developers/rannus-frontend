import HomesPage from "./pages/Homes/Dashboard";
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
    element: <div>Welcome</div>,
    icon: <IconWaveSine />,
    name: "Welcome",
  },
];
