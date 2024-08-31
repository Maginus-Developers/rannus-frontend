import { Flex, Loader, Title } from "@mantine/core";

export default function AuthCallback() {
  const url = new URL(window.location.href);
  const token = url.searchParams.get("token");
  const expires = url.searchParams.get("expires");

  if (token) window.localStorage.setItem("token", token);
  if (expires) window.localStorage.setItem("expires", expires);

  // window.location.href = "/dashboard";

  return (
    <Flex w="100vw" h="100vh" direction="column" justify="center" align="center">
      <Title order={1}>Loading...</Title>
      <Loader size="xl" />
    </Flex>
  );
}
