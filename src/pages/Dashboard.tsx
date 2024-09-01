import { Button, Container, Flex, Image, ScrollArea, Text, Title } from "@mantine/core";

interface Guild {
  did: string;
  icon?: string;
  name: string;
  guild_admin: string[];
  bot_joined: boolean;
  prefix: string;
  banner?: string;
  id: string;
}

export default function Dashboard() {
  const guild: Guild = {
    id: "abcxyzabcxyzabc",
    did: "917410648076460084",
    name: "Magimus Multiverse",
    bot_joined: true,
    guild_admin: ["xyzabcxyzabcxyz"],
    prefix: "",
    banner: "https://cdn.discordapp.com/banners/917410648076460084/07f5d27f1d2493854d6fe95e214dc710.png?size=4096",
    icon: "https://cdn.discordapp.com/icons/917410648076460084/081d1008ac0c642346f018de581ac710.png",
  };

  const imageTrigger = guild.banner;
  const parent = null;

  return (
    <ScrollArea h="100vh">
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
    </ScrollArea>
  );
}
