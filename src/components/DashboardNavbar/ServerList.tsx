import { Avatar, Button, Menu } from "@mantine/core";
import { IconArrowDown } from "@tabler/icons-react";
import { useGuildStore } from "../../states/guild";

const ServerList = () => {
  const { guilds, chosenGuild, choseGuild } = useGuildStore((state) => state);
  return (
    <Menu shadow="md">
      <Menu.Target>
        <Button
          variant="transparent"
          bg="#16171F"
          w={"100%"}
          color={"white"}
          leftSection={<Avatar radius="xl" src={chosenGuild?.icon ?? ""}></Avatar>}
          rightSection={<IconArrowDown></IconArrowDown>}
          size="lg"
          radius={"md"}
        >
          {chosenGuild?.name ?? "Select a server"}
        </Button>
      </Menu.Target>

      <Menu.Dropdown bg={"#1f212a"} variant="transparent" ml={{ sm: "0", md: "sm" }}>
        {Object.values(guilds)
          .filter((a) => a.bot_joined)
          .map((server) => (
            <Menu.Item
              key={server.name}
              leftSection={<Avatar src={server.icon} radius="xl"></Avatar>}
              color="blue"
              onClick={choseGuild(server.id)}
              bg={server.id === chosenGuild?.id ? "blue.9" : "transparent"}
            >
              {server.name}
            </Menu.Item>
          ))}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ServerList;