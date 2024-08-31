import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  ScrollArea,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { ScrollRestoration, useNavigate } from "react-router-dom";
import { useGuildStore } from "../states/guild";
import { useUserStore } from "../states/user";
import autoAnimate from '@formkit/auto-animate'
import { useEffect, useState, useRef } from "react";

const ChooseGuild = () => {
  const {
    user,
    redirectAuth,
    loading: userLoading,
  } = useUserStore((state) => state);
  const { guilds, choseGuild } = useGuildStore((state) => state);
  const [imageTrigger, setImageTrigger] = useState("");
  const parent = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !userLoading) {
      redirectAuth();
    }
  }, [redirectAuth, user, userLoading]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    parent.current && autoAnimate(parent.current, {
      duration: 450,
      easing: 'ease-in',
    });
  }, [parent]);

  const inviteBot = async () => { };
  return (
    <ScrollArea h={`100vh`}>
      <Container size="xl" p={"0"} pos={"relative"}>
        {" "}
        <Container fluid size="xl" w="100%" style={{
          position: 'fixed',
          left: "0%",
          zIndex: '1',
        }} ref={parent}>
          {imageTrigger ? <Image className="banner" h={"100vh"} width={"100%"} src={imageTrigger && `${imageTrigger}`} pos="fixed" style={{
            zIndex: '1',
            scale: '1.1',
            transition: 'opacity 0.5s linear',
            filter: 'blur(10px)'
          }}></Image> : <></>}

          <Box className="banner" style={{
            position: "fixed",
            scale: '1.1',
            width: '100%',
            height: "100vh",
            backgroundImage: "linear-gradient(#27293400, #272934 90%)",
            zIndex: '100'
          }}></Box>


        </Container>
        <Flex direction={"column"} style={{
          zIndex: '999',
          position: 'relative'
        }}>
          <ScrollRestoration />
          <Center my={"lg"} style={{
              mixBlendMode: 'difference'
            }}>
            <Title p="xl">
              Select A Server
            </Title>
          </Center>
          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing={{ base: 10, sm: 'lg' }}
            px={"20px"}
          >
            {Object.values(guilds).map((server) => (
              <Box key={server.id} color="blue" h={"fit-content"} bg="#1f212a" className="server-card" style={{
                borderRadius: "12px",
              }}>
                <Flex direction={"column"}>
                  <Box pos={"relative"} onMouseOver={() => setImageTrigger(server.banner ? `${server.banner}?size=4096` :   (server.icon ?`${server.icon}?size=4096` : ""))} onMouseLeave={() => setImageTrigger("")}>
                    <Image src={server.banner ? `${server.banner}?size=4096` : (server.icon && `${server.icon}?size=4096`)} fit="cover" h="8rem" fallbackSrc="https://static.vecteezy.com/system/resources/previews/003/872/073/non_2x/seamless-coffee-tool-pattern-doodle-coffee-tool-icon-vector.jpg" style={{
                      borderTopLeftRadius: '9px',
                      borderTopRightRadius: '9px',
                    }}></Image>
                    <Box pos={"absolute"} h={"100%"} w={"100%"} top={"0%"} style={{
                      borderTopLeftRadius: '12px',
                      borderTopRightRadius: '12px',
                      transform: "translateY(2px)",
                      background: "linear-gradient(to top, #1f212a 4%, #1f212a00)"
                    }}></Box>

                    <Box pos={"absolute"} p="sm" px={"15px"} style={{
                      bottom: "10px"
                    }}>
                      <Flex>
                        <div style={{
                          background: "#1f212a",
                          width: "fit-content",
                          borderRadius: "15px",
                        }}>
                          {server.icon ? (
                            <Avatar src={server.icon} radius={"lg"} size={"lg"} color="gray"></Avatar>
                          ) : (
                            <Avatar name={server.name} radius={"lg"} size={"lg"} color="gray"></Avatar>
                          )}
                        </div>
                        <Box px="12px" style={{
                          transform: "translateY(22px)"
                        }}>
                          <Title order={3} lineClamp={1}>{server.name}</Title>
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                  <Box p={"10px"}>
                    <Button
                      radius={"0"}
                      w={"100%"}
                      className="server-card-button"
                      style={{
                        borderRadius: "8px",
                      }}
                      onMouseOver={() => setImageTrigger(server.icon ? `${server.icon}?size=4096` :   (server.icon ?`${server.icon}?size=4096` : ""))} 
                      onMouseLeave={() => setImageTrigger("")}
                      onClick={
                        server.bot_joined
                          ? () => {
                            choseGuild(server.id)();
                            navigate("/dashboard");
                          }
                          : inviteBot
                      }
                    >
                      {server.bot_joined ? "Go to Dashboard" : "Invite To Server"}
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
};

export default ChooseGuild;
