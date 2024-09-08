import { create } from "zustand";
import { API_URL } from "../constants";
import { redirectAuth, useUser } from "./user";
import { Guild } from "../types";
import { createSelectors } from "../utils";

type State = {
  guilds: Record<string, Guild>;
  loading: boolean;
  error?: string;
  status?: number;
  chosenGuild?: Guild;
  currentGuildAutoResponse: string[];
};
type ApiResponse = {
  guilds: Guild[];
  message: string;
  status: number;
  displayMessage: string;
};
type Actions = {
  fetchedGuild: (autoRedirect: boolean) => Promise<ApiResponse>;
  choseGuild: (id: string) => () => {
    guilds: Guild[];
    message: string;
    status: number;
    displayMessage: string;
    error?: string;
  };
  setGuild: (guild: Guild) => void;
  removeChosenGuild: () => void;
  setGuildError: (error: string) => void;
};

export const useGuildStore = create<State & Actions>((set, get) => ({
  guilds: {},
  chosenGuild: undefined,
  loading: true,
  currentGuildAutoResponse: [],
  fetchedGuild: async (autoRedirect) => {
    set({ loading: true, error: undefined, guilds: {}, status: undefined });
    if (!window.localStorage.getItem("token")) {
      if (!autoRedirect) {
        set({ loading: false, error: "Unauthorized", guilds: {}, status: 401 });
        return {
          guilds: [],
          message: "Unauthorized",
          status: 401,
          displayMessage: "Unauthorized",
        };
      }
      redirectAuth();
      set({ loading: false, error: "Unauthorized", guilds: {}, status: 401 });
      return {
        guilds: [],
        message: "Unauthorized",
        status: 401,
        displayMessage: "Unauthorized",
      };
    }
    try {
      const response = await fetch(`${API_URL}/api/user/getGuilds`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${window.localStorage.getItem("token")}`,
        },
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        if (!autoRedirect) {
          set({
            loading: false,
            error: "Unauthorized",
            guilds: {},
            status: 401,
          });
          return {
            guilds: [],
            message: "Unauthorized",
            status: 401,
            displayMessage: "Unauthorized",
          };
        }
        redirectAuth();
        set({ loading: false, error: "Unauthorized", guilds: {}, status: 401 });
        return {
          guilds: [],
          message: "Unauthorized",
          status: 401,
          displayMessage: "Unauthorized",
        };
      }
      if (response.status === 500) {
        set({
          loading: false,
          error: "Internal Server Error",
          guilds: {},
          status: 500,
        });
        return {
          guilds: [],
          message: "Internal Server Error",
          status: 500,
          displayMessage: "Internal Server Error",
        };
      }
      const data = (await response.json()) as Guild[];
      const guildMap = {} as Record<string, Guild>;
      data.forEach((guild) => (guildMap[guild.id] = guild));
      if (localStorage.getItem("guild")) {
        const guildId = localStorage.getItem("guild");
        const chosenGuild = guildId ? guildMap[guildId] : undefined;
        if (!chosenGuild) {
          localStorage.removeItem("guild");
          set({ loading: false, error: "Guild not found" });
          return { guilds: data, message: "Guild not found", status: 404, displayMessage: "Guild not found" }
        }
        if (!chosenGuild?.bot_joined) {
          localStorage.removeItem("guild");
          set({ loading: false, error: "Unauthorized" });
          return { guilds: data, message: "Unauthorized", status: 401, displayMessage: "Unauthorized" }
        };
        const userID = useUser.getState().user?.id;
        if (!userID) {
          localStorage.removeItem("guild");
          set({ loading: false, error: "Unauthorized" });
          return { guilds: data, message: "Unauthorized", status: 401, displayMessage: "Unauthorized" }
        }
        if (!chosenGuild.guild_admin.includes(userID)) {
          localStorage.removeItem("guild");
          set({ loading: false, error: "Unauthorized" });
          return { guilds: data, message: "Unauthorized", status: 401, displayMessage: "Unauthorized" }
        };
        set((state) => ({
          ...state,
          loading: false,
          error: undefined,
          guilds: guildMap,
          status: 200,
          chosenGuild,
        }));
        return {
          guilds: data,
          message: "Success",
          status: 200,
          displayMessage: "Success",
        };
      }
      set((state) => ({
        ...state,
        loading: false,
        error: undefined,
        guilds: guildMap,
        status: 200,
      }));
      return {
        guilds: data,
        message: "Success",
        status: 200,
        displayMessage: "Success",
      };
    } catch (e) {
      set({
        loading: false,
        error: `Internal Server Error: ${e}`,
        guilds: {},
        status: 500,
      });
      return {
        guilds: [],
        message: `Internal Server Error: ${e}`,
        status: 500,
        displayMessage: "Internal Server Error",
      };
    }
  },
  choseGuild: (id) => () => {
    const chosenGuild = get().guilds[id];
    if (!chosenGuild) return {
      guilds: [],
      message: "Guild not found",
      status: 404,
      displayMessage: "Guild not found",
      error: "Guild not found"
    };
    if (!chosenGuild.bot_joined) return {
      guilds: [],
      message: "Unauthorized",
      status: 401,
      displayMessage: "Unauthorized",
      error: "Unauthorized"
    };
    const userID = useUser.getState().user?.id
    if (!userID) return {
      guilds: [],
      message: "Unauthorized",
      status: 401,
      displayMessage: "Unauthorized",
      error: "Unauthorized"
    }
    console.log(userID, chosenGuild.guild_admin)
    if (!chosenGuild.guild_admin.includes(userID)) return {
      guilds: [],
      message: "Unauthorized",
      status: 401,
      displayMessage: "Unauthorized",
      error: "Unauthorized"
    }
    window.localStorage.setItem("guild", id);
    set(() => ({ chosenGuild: chosenGuild }));
    return {
      guilds: [],
      message: "Success",
      status: 200,
      displayMessage: "Success",
    };
  },
  setGuild: (guild) =>
    set((state) => ({
      ...state,
      guilds: { ...state.guilds, [guild.id]: guild },
    })),
  removeChosenGuild: () => set((state) => ({ ...state, chosenGuild: undefined })),
  setGuildError: (error) => set((state) => ({ ...state, error, loading: false })),
}));

export const useGuild = createSelectors(useGuildStore);