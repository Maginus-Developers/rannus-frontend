import { Box, Flex, ScrollArea, Text } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { Link, Outlet, ScrollRestoration } from "react-router-dom";

const HomeNavbar = () => {
  const { hovered: homeHovered, ref: homeRef } = useHover();
  const { hovered: dashboardHovered, ref: dashboardRef } = useHover();

  return (
    <Box h="100vh">
      <ScrollRestoration />
      <Box pt="30px" pl="40px">
        <ul>
          <Flex gap={20}>
            <li>
              <Text
                size="xl"
                ref={homeRef}
                color={homeHovered ? "#ffffff" : "#b3b3b3"}
              >
                Home
              </Text>
            </li>
            <li>
              <Text
                size="xl"
                ref={dashboardRef}
                color={dashboardHovered ? "#ffffff" : "#b3b3b3"}
              >
                <Link to="/dashboard">Dashboard</Link>
              </Text>
            </li>
          </Flex>
        </ul>
      </Box>
      <ScrollArea h="calc(100vh - 60px)">
        <Outlet />
      </ScrollArea>
    </Box>
  );
};

export default HomeNavbar;
