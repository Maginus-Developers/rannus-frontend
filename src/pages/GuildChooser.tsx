import autoAnimate from "@formkit/auto-animate";
import { Avatar, Box, Button, Center, Container, Flex, Image, ScrollArea, SimpleGrid, Title } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { ScrollRestoration, useNavigate } from "react-router-dom";

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

export default function GuildChooser() {
  // const { user, redirectAuth, loading: userLoading } = useUserStore((state) => state);
  // const { guilds, choseGuild } = useGuildStore((state) => state);
  const [imageTrigger, setImageTrigger] = useState("");
  const parent = useRef(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user && !userLoading) {
  //     redirectAuth();
  //   }
  // }, [redirectAuth, user, userLoading]);

  useEffect(() => {
    if (!parent.current) return;
    autoAnimate(parent.current, {
      duration: 450,
      easing: "ease-in-out",
    });
  }, [parent]);

  const guilds: Guild[] = [
    {
      id: "abcxyzabcxyzabc",
      did: "917410648076460084",
      name: "Magimus Multiverse",
      bot_joined: true,
      guild_admin: ["xyzabcxyzabcxyz"],
      prefix: "",
      banner: "https://cdn.discordapp.com/banners/917410648076460084/07f5d27f1d2493854d6fe95e214dc710.png",
      icon: "https://cdn.discordapp.com/icons/917410648076460084/081d1008ac0c642346f018de581ac710.png",
    },
  ];

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
                transition: "opacity 0.5s linear",
                filter: "blur(10px)",
              }}
            />
          )}

          <Box
            className="banner"
            pos="fixed"
            w="100%"
            h="100vh"
            bg="linear-gradient(#27293400, #272934 90%)"
            style={{
              scale: "1.1",
              // backgroundImage: "linear-gradient(#27293400, #272934 90%)",
              zIndex: "100",
            }}
          />
        </Container>
        <Flex direction="column" style={{ zIndex: "999", position: "relative" }}>
          <ScrollRestoration />
          <Center my="lg" style={{ mixBlendMode: "difference" }}>
            <Title p="xl">Select A Server</Title>
          </Center>
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing={{ base: 10, sm: "lg" }} px="20px">
            {guilds.map((guild) => (
              <Box key={guild.id} color="blue" h="fit-content" bg="#1f212a" className="server-card" style={{ borderRadius: "12px" }}>
                <Flex direction={"column"}>
                  <Box
                    pos="relative"
                    onMouseOver={() => setImageTrigger(guild.banner ? `${guild.banner}?size=4096` : guild.icon ? `${guild.icon}?size=4096` : "")}
                    onMouseLeave={() => setImageTrigger("")}
                  >
                    <Image
                      src={guild.banner ? `${guild.banner}?size=4096` : guild.icon && `${guild.icon}?size=4096`}
                      fit="cover"
                      h="8rem"
                      fallbackSrc="https://static.vecteezy.com/system/resources/previews/003/872/073/non_2x/seamless-coffee-tool-pattern-doodle-coffee-tool-icon-vector.jpg"
                      style={{ borderTopLeftRadius: "9px", borderTopRightRadius: "9px" }}
                    ></Image>
                    <Box
                      pos="absolute"
                      h="100%"
                      w="100%"
                      top={0}
                      bg="linear-gradient(to top, #1f212a 4%, #1f212a00)"
                      style={{
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                        transform: "translateY(2px)",
                        // background: "linear-gradient(to top, #1f212a 4%, #1f212a00)",
                      }}
                    />

                    <Box pos="absolute" p="sm" px={15} bottom={10}>
                      <Flex>
                        <Box
                          style={{
                            background: "#1f212a",
                            width: "fit-content",
                            borderRadius: "15px",
                          }}
                        >
                          <Avatar {...(guild.icon ? { src: guild.icon } : { name: guild.name })} radius="lg" size="lg" color="gray" />
                        </Box>
                        <Box px="12px" style={{ transform: "translateY(22px)" }}>
                          <Title order={3} lineClamp={1}>
                            {guild.name}
                          </Title>
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                  <Box p={10}>
                    <Button
                      radius={0}
                      w="100%"
                      className="server-card-button"
                      style={{ borderRadius: "8px" }}
                      onMouseOver={() => setImageTrigger(guild.icon ? `${guild.icon}?size=4096` : guild.icon ? `${guild.icon}?size=4096` : "")}
                      onMouseLeave={() => setImageTrigger("")}
                      onClick={() => {
                        navigate(`/guild/${guild.id}`);
                      }}
                    >
                      {guild.bot_joined ? "Go to Dashboard" : "Invite To Server"}
                    </Button>
                  </Box>
                </Flex>
              </Box>
            ))}
          </SimpleGrid>
        </Flex>
      </Container>
    </ScrollArea>
  );
}
