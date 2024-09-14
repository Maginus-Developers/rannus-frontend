import HomesPage from "@/pages/Dashboard";
import { IconHome, IconWaveSine } from "@tabler/icons-react";
import { RouteObjectWithMeta } from "@/types";
import AutomatedResponse from "@/pages/AutomatedResponse";

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
  {
    path: "/dashboard/automated-response",
    element: <AutomatedResponse />,
    icon: <IconWaveSine />,
    name: "Automated Response",
  },
];
