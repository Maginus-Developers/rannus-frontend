import { Flex, Loader, Title } from "@mantine/core";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { REALTIME_URL } from "../constants";
import { useGuildStore } from "../states/guild";
import { useUserStore } from "../states/user";
import { Guild, User } from "../types";

export const AuthProvider = () => {
  const { checkUser, loading: userLoading, token, setUser } = useUserStore((state) => state);
  const { fetchedGuild, loading: guildLoading, setGuild, setGuildError: setError } = useGuildStore((state) => state);
  useEffect(() => {
    checkUser(false).then((res) => {
      if (res.status == 200) {
        console.log("User is logged in");
        fetchedGuild(false).then((res) => {
          if (res.status == 200) {
            console.log("Fetched guilds.");
          }
        });
      } else {
        console.log("User is not logged in");
        setError("Unauthorized");
      }
    });
  }, [checkUser, fetchedGuild, setError]);
  useEffect(() => {
    function connect() {
      const ws = new WebSocket(REALTIME_URL);
      let dontReconnect = false;
      ws.onopen = () => {
        console.log("Connected to websocket");
        ws.send(JSON.stringify({ type: "authorization", token }));
      };
      ws.onmessage = (message) => {
        const data = JSON.parse(message.data);
        if (data.type === "unauthorized") {
          console.log("Unauthorized");
          ws.close();
          dontReconnect = true;
          return;
        }
        if (data.record) {
          switch (data.type) {
            case "guild": {
              const guild = data.record as Guild;
              setGuild(guild);
              break;
            }
            case "user": {
              const user = data.record as User;
              setUser(user);
              break;
            }
            default:
              break;
          }
        }
      };
      ws.onclose = () => {
        console.log("Websocket closed");
        if (!dontReconnect)
          setTimeout(() => {
            connect();
          }, 1000);
      };
    }
    if (token) {
      connect();
    }
  }, [setGuild, setUser, token]);


  window.addEventListener("storage", (e) => {
    console.log(e);
  });
  if (userLoading || guildLoading) {
    return (
      <Flex w="100vw" h="100vh" direction="column" justify="center" align="center">
        <Title order={1}>Loading...</Title>
        <Loader size="xl" />
      </Flex>
    );
  }

  return <Outlet />;
};
