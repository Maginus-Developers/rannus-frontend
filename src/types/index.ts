import { RouteObject } from "react-router-dom";

export type RouteObjectWithMeta = RouteObject & {
  icon: JSX.Element;
  name: string;
  path: string;
  getUrl?: () => string;
};


interface RecordModel {
  [key: string]: unknown;
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  expand?: {
    [key: string]: unknown;
  };
}
export interface User extends RecordModel {
  did: string;
  avatar: string;
  username: string;
  guild_admin: string[];
};

export interface Guild extends RecordModel {
  did: string;
  icon?: string;
  name: string;
  guild_admin: string[];
  bot_joined: boolean;
  prefix: string;
  banner?: string;
  auto_response: string[];
};

export interface Member extends RecordModel {
  did: string;
  guildDid: string;
  xp: number;
  balance: number;
  messages: number;
  user: string;
  expand?: {
    user: User;
  };
}

export interface Autorep extends RecordModel {
  guildDid: string;
  match: string;
  case: boolean; // case sensitive or not
  type: "match" | "contains" | "startsWith" | "endsWith";
}