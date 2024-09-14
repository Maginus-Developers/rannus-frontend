import { Avatar, Button, Menu, Text, rem } from "@mantine/core";
import { IconMessageCircle, IconPhoto, IconSearch, IconSettings, IconTrash } from "@tabler/icons-react";
import { useUserStore } from "../../states/user";

export function ProfileIcon() {
  const { user, logout } = useUserStore((state) => state);
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Button variant="transparent">
          {user?.avatar ? (
            <Avatar radius={"xl"} src={user.avatar}></Avatar>
          ) : (
            <Avatar color="initials" radius="xl" name={user?.username ? user.username : "No Idea"}></Avatar>
          )}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle style={{ width: rem(14), height: rem(14) }} />}>Messages</Menu.Item>
        <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>Gallery</Menu.Item>
        <Menu.Item
          leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
          rightSection={
            <Text size="xs" c="dimmed">
              ⌘K
            </Text>
          }
        >
          Search
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item color="red" leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}