import { Button, Container, Flex, Image, Text, Title } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useGuildStore } from "../states/guild";


export default function Dashboard() {
  const guild = useGuildStore((state) => state.chosenGuild);
  const clearChosenGuild = useGuildStore((state) => state.removeChosenGuild);
  const redirect = useNavigate();
  if (!guild) {
    return <Container size="xl">Loading...</Container>;
  }
  if (!guild.bot_joined) {
    clearChosenGuild();
    redirect("/choose-guild");
    return ;
  }

  const imageTrigger = guild.banner;
  const parent = null;

  return (
      <Container size="xl" p="0" pos="relative">
        <Container fluid size="xl" w="100%" pos="fixed" left="0" style={{ zIndex: "1" }} ref={parent}>
          {imageTrigger && (
            <Image
              className="banner"
              h="100vh"
              width="100%"
              src={imageTrigger}
              pos="fixed"
              style={{
                zIndex: "1",
                scale: "1.1",
                filter: "blur(5px)",
              }}
            />
          )}
          <Flex h="100vh" w="100%" justify="center" align="center" style={{ zIndex: "2" }}>
            <Container size="xl" p="0" style={{ zIndex: "2" }}>
              <Flex direction="column" align="center" gap={10}>
                <Image src={guild.icon} h="100px" w="100px" style={{ borderRadius: "50%" }} />
                <Title>{guild.name}</Title>
                <Text size="xl">Moderate your server with ease.</Text>
                <Button
                  variant="outline"
                  size="md"
                  color="#ffffff"
                  onClick={() => {
                    window.location.href = `https://discord.com/oauth2/authorize?client_id=1276226772026790064&guild_id=${guild.did}`;
                  }}
                >
                  Invite Now
                </Button>
              </Flex>
            </Container>
          </Flex>
        </Container>
        <Container size="xl" p="0" style={{ zIndex: "2" }}>
          <Image
            src={guild.banner}
            h="100vh"
            width="100%"
            pos="fixed"
            style={{
              zIndex: "0",
              scale: "1.1",
            }}
          />
        </Container>
      </Container>
  );
}
