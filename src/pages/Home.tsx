import { Box, Button, Flex, Text, Title } from "@mantine/core";
import { client_id } from "../constants";

export default function Home() {
  return (
    <Flex p="40px" h="90%" display="flex" direction="column" justify="center">
      <Flex direction="column" gap={10}>
        <Title size="8rem" style={{ transform: "translateX(-6px)" }}>
          Rannus
        </Title>
        <Text style={{ transform: "translateY(-20px)" }} size="xl">
          Moderate Your Discord Servers And Grow It.
        </Text>
        <Box>
          <Button
            variant="outline"
            size="md"
            color="#ffffff"
            onClick={() =>
              window
                .open(
                  `https://discord.com/oauth2/authorize?client_id=${client_id}&permissions=8&integration_type=0&scope=bot+applications.commands`,
                  "_blank"
                )
                ?.focus()
            }
          >
            Invite Now
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
