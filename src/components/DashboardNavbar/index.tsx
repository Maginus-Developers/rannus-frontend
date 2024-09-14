import { AppShell, Burger, Button, Center, em, Flex, Image, ScrollArea } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { IconBell } from "@tabler/icons-react";
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { useGuildStore } from "../../states/guild";
import { useUserStore } from "../../states/user";
import { ProfileIcon } from "./ProfileIcon";
import ServerList from "./ServerList";
import Sidebar from "./Sidebar";

const DashboardNavbar = () => {
  const [opened, { toggle }] = useDisclosure();
  const { isLogout, user, redirectAuth, loading: userLoading } = useUserStore((state) => state);
  const { chosenGuild } = useGuildStore((state) => state);

  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !userLoading) {
      redirectAuth();
    } else {
      if (!chosenGuild) {
        navigate("/choose-guild");
      }
    }
  }, [chosenGuild, navigate, redirectAuth, user, userLoading]);

  if (isLogout) {
    window.location.href = "/";
    return;
  }

  const bg = "#20222B";
  const headerHeight = 70;
  const sidebarWidth = 300;
  return (
    <AppShell
      header={{ height: headerHeight }}
      navbar={{
        width: sidebarWidth,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
      withBorder={false}
      bg="#272934"
    >
      <ScrollRestoration />
      <AppShell.Header bg={bg}>
        <Flex
          justify={"space-between"}
          align="center"
          h="100%"
          mx={{
            md: "10rem",
            sm: "2.5rem",
          }}
        >
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" mx="sm" />
          <div>
            <Image color="initials" fit="contain" h={50} src={Logo} radius={"xl"}></Image>
          </div>
          <Flex align="center" h="100%">
            {/* <Button variant="light" color="yellow" visibleFrom="md">
                Buy Premium
              </Button> */}
            <Button variant="transparent">
              <IconBell />
            </Button>
            <ProfileIcon></ProfileIcon>
          </Flex>
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar
        p="md"
        bg={bg}
        style={{
          borderRadius: isMobile ? "0" : "33px",
          ...(isMobile ? {} : { height: `calc(100vh - ${headerHeight + 40}px)` }),
        }}
        m={isMobile ? "0" : "md"}
      >
        <AppShell.Section mb="xl" mt="sm">
          <Center>
            <ServerList></ServerList>
          </Center>
        </AppShell.Section>
        <AppShell.Section grow component={ScrollArea} type="scroll">
          <Sidebar></Sidebar>
        </AppShell.Section>
        {/* <AppShell.Section>idk</AppShell.Section> */}
      </AppShell.Navbar>

      <AppShell.Main ml={isMobile ? "0" : "md"}>
        <ScrollArea h={`calc(100vh - ${headerHeight + 30}px)`} type="scroll" p="md">
          <Outlet />
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
};

export default DashboardNavbar;
