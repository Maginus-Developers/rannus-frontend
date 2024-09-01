import { Flex, Loader, Title } from "@mantine/core";
import { useEffect } from "react";

export default function AuthCallback() {
  // example
  useEffect(() => {
    const timeout = setTimeout(() => {
      // success
      window.location.href = "/dashboard";
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Flex w="100vw" h="100vh" direction="column" justify="center" align="center">
      <Title order={1}>Loading...</Title>
      <Loader size="xl" />
    </Flex>
  );
}
