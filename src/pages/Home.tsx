import { Box, Button, Flex, Text, Title } from "@mantine/core";

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
          <Button variant="outline" size="md" color="#ffffff">
            Invite Now
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
