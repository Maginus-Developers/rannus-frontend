import { RouteObject } from "react-router-dom";

export type RouteObjectWithMeta = RouteObject & {
    icon: JSX.Element;
    name: string;
    path: string;
    getUrl?: () => string;
};
export type User = {
    did: string
    avatar: string
    username: string
    guild_admin: string[]
    id: string
}

export type Guild = {
    did: string
    icon?: string
    name: string
    guild_admin: string[]
    bot_joined: boolean
    prefix: string
    banner?: string
    id: string
}

export interface Member {
    did: string;
    guildDid: string;
    xp: number;
    balance: number;
    messages: number;
    user: string;
    expand?: {
        user: User;
    };
    id: string;
}