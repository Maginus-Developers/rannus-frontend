import { Flex, Loader, Title } from "@mantine/core";

export default function AuthCallback() {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("jwt");
  if (code) {
    window.localStorage.setItem("token", code);
    const stateParam = url.searchParams.get("state");
    if (stateParam) {
      const state = JSON.parse(decodeURIComponent(stateParam));
      if (state.redirectTo) {
        window.location.href = state.redirectTo;
      }
    }
  }

  return (
    <Flex w="100vw" h="100vh" direction="column" justify="center" align="center">
      <Title order={1}>Loading...</Title>
      <Loader size="xl" />
    </Flex>
  );
}
