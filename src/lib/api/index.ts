// :)))

import { Guild } from "./models";

export const endpoint = import.meta.env.PROD ? "https://api.rannus.com" : "http://localhost:8080";

export async function getUserGuilds(id: string) {
  const response = await fetch(`${endpoint}/user/${id}/guilds`);

  return (await response.json()) as Guild[];
}
