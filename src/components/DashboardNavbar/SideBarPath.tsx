import HomesPage from "@/pages/Dashboard";

import { IconHome, IconWaveSine } from "@tabler/icons-react";
import { RouteObjectWithMeta } from "@/types";

export const SidebarPath: RouteObjectWithMeta[] = [
  {
    path: "/",
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
      return "/dashboard/profile/username/guild";
    },
  },
  {
    path: "/dashboard/welcome",
    element: <div>Welcome</div>,
    icon: <IconWaveSine />,
    name: "Welcome",
  },
];
