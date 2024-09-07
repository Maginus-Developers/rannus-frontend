import HomesPage from "@/pages/Dashboard";
import { IconHome, IconWaveSine } from "@tabler/icons-react";
import { RouteObjectWithMeta } from "@/types";

export const SidebarPath: RouteObjectWithMeta[] = [
  {
    path: "/dashboard",
    element: <HomesPage />,
    icon: <IconHome />,
    name: "Dashboard",
  },
  {
    path: "/dashboard/welcome",
    element: <div>Welcome</div>,
    icon: <IconWaveSine />,
    name: "Welcome",
  },
];
