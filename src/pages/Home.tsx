import { Box, Button, Flex, Text, Title } from "@mantine/core";
import HomeNavbar from "../components/HomeNavbar";

export default function Home() {
  return (
    <Flex direction="column" style={{
      height: "calc(100vh - 63px)",
      position: "relative"
    }}>
      <HomeNavbar />
      <Flex px="50px" h="90%" display="flex" direction="column" justify="center" style={{
        zIndex: '100'
      }}>
        <Flex direction="column" align={"center"} gap={10} justify={"center"}>
          <Flex direction={"column"} align={"center"} style={{
            transform: "translateY(-20px)"
          }}>
            <Title size="8rem" style={{ transform: "translateX(-6px)", color: "#fff" }}>
              Rannus
            </Title>
            <Text style={{ transform: "translateY(-20px)", color: "#cccccc" }} size="lg">
              Moderate Your Discord Servers And Grow It.
            </Text>
          </Flex>
          
          <Flex style={{
            marginTop: "10px",
            width: "100%"
          }} gap={30} justify={"center"}>
            <Button
              bg={"#7a0bdb"}
              size="md"
              radius={"xl"}
              color="#ffffff"
              style={{
                boxShadow: "0px 15px 30px rgb(0, 0, 0, 0.3)"
              }}
              onClick={() => {
                window.location.href = "https://discord.com/oauth2/authorize?client_id=1276226772026790064";
              }}
            >
              Invite Now
            </Button>
            <Button
              bg={"#0d0015"}
              size="md"
              radius={"xl"}
              color="#ffffff"
              style={{
                boxShadow: "0px 15px 30px rgb(0, 0, 0, 0.3)"
              }}
              onClick={() => {
                window.location.href = "https://discord.com/oauth2/authorize?client_id=1276226772026790064";
              }}
            >
              Feedback
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Flex style={{
        width: "100%",
        height: "50%",
        position: "absolute",
        bottom: "20%",
        zIndex: "0"
      }} justify={"center"}>
        <Box bg={"#120121"} style={{
          width: window && window.innerHeight/0.3,
          height: window && window.innerHeight/0.5,
          borderRadius: '50%',
          padding: '100px',
          display: "flex",
          justifyContent: "center"
        }}>
          <Box bg={"#240242"} style={{
            width: window && window.innerHeight/0.4,
            height: window && window.innerHeight/0.5,
            borderRadius: '50%',
            padding: '100px',
            display: "flex",
            justifyContent: "center"
          }}>
            <Box bg={"#370373"} style={{
              width: window && window.innerHeight/0.5,
              height: window && window.innerHeight/0.5,
              borderRadius: '50%',
              padding: '100px',
              display: "flex",
              justifyContent: "center"
            }}>
              <Box bg={"#4a2bb9"} style={{
                width: window && window.innerHeight/0.5,
                height: window && window.innerHeight/0.5,
                borderRadius: '50%'
              }}></Box>
            </Box>
          </Box>
        </Box>
        
      </Flex>
      <Box style={{
        height: window && window.innerHeight/0.5,
        width: "100%",
        position: "absolute",
        background: "#0d0015",
        top: "98%",
        boxShadow: '0px -30px 100px #4a2bb9'
      }}>
        
      </Box>
    </Flex>
  );
}
