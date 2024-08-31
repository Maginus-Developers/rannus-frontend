import { endpoint } from ".";

export function getOAuthUrl() {
  return `https://discord.com/oauth2/authorize?client_id=1276226772026790064&response_type=code&redirect_uri=${endpoint}/auth/callback&scope=identify+guilds+guilds.members.read`;
}
