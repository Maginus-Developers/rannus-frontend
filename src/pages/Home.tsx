import { Box, Button, Flex, Text, Title } from "@mantine/core";
import HomeNavbar from "../components/HomeNavbar";

export default function Home() {
  return (
    <Box>
      <HomeNavbar />
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
              onClick={() => {
                window.location.href = "https://discord.com/oauth2/authorize?client_id=1276226772026790064";
              }}
            >
              Invite Now
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
