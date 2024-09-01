import { Box, Flex, Group, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconHome, IconLayoutDashboard } from "@tabler/icons-react";
import { Link, Outlet, ScrollRestoration } from "react-router-dom";

export default function HomeNavbar() {
  const { hovered: homeHovered, ref: homeRef } = useHover();
  const { hovered: dashboardHovered, ref: dashboardRef } = useHover();

  return (
    <Box>
      <ScrollRestoration />
      <Box pt="30px" pl="40px">
        <Group gap="xl" align="center" c="blue">
          <Flex align={"center"} gap={"xs"}>
            <IconHome />
            <Text m={0} size="xl" ref={homeRef} c={homeHovered ? "#ffffff" : "#b3b3b3"}>
              Home
            </Text>
          </Flex>

          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <Flex align={"center"} gap={"xs"}>
              <IconLayoutDashboard />
              <Text m={0} size="xl" ref={dashboardRef} c={dashboardHovered ? "#ffffff" : "#b3b3b3"}>
                Dashboard
              </Text>
            </Flex>
          </Link>
        </Group>
      </Box>
      <Outlet />
    </Box>
  );
}
