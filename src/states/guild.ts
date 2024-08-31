import { create } from 'zustand'
import { API_URL } from '../constants'
import { redirectAuth } from './user'
import { Guild } from '../types'


type State = {
    guilds: Record<string, Guild>
    loading: boolean;
    error?: string;
    status?: number;
    chosenGuild?: Guild
}
type ApiResponse = {
    guilds: Guild[]
    message: string
    status: number
    displayMessage: string
}
type Actions = {
    fetchedGuild: (autoRedirect: boolean) => Promise<ApiResponse>
    choseGuild: (id: string) => () => void
    setGuild: (guild: Guild) => void
}

export const useGuildStore = create<State & Actions>((set, get) => ({
    guilds: {},
    chosenGuild: undefined,
    loading: true,
    fetchedGuild: async (autoRedirect) => {
        if (!window.localStorage.getItem("token")) {
            if (!autoRedirect) {
                set({ loading: false, error: "Unauthorized", guilds: {}, status: 401 });
                return {
                    guilds: [],
                    message: "Unauthorized",
                    status: 401,
                    displayMessage: "Unauthorized"
                }
            }
            redirectAuth()
            set({ loading: false, error: "Unauthorized", guilds: {}, status: 401 });
            return {
                guilds: [],
                message: "Unauthorized",
                status: 401,
                displayMessage: "Unauthorized"
            }
        }
        try {
            const response = (await fetch(`${API_URL}/api/user/getGuilds`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${window.localStorage.getItem("token")}`
                }
            }));
            if (response.status === 401) {
                localStorage.removeItem('token');
                if (!autoRedirect) {
                    set({ loading: false, error: "Unauthorized", guilds: {}, status: 401 });
                    return {
                        guilds: [],
                        message: "Unauthorized",
                        status: 401,
                        displayMessage: "Unauthorized"
                    }
                }
                redirectAuth()
                set({ loading: false, error: "Unauthorized", guilds: {}, status: 401 });
                return {
                    guilds: [],
                    message: "Unauthorized",
                    status: 401,
                    displayMessage: "Unauthorized"
                }
            }
            if (response.status === 500) {
                set({ loading: false, error: "Internal Server Error", guilds: {}, status: 500 });
                return {
                    guilds: [],
                    message: "Internal Server Error",
                    status: 500,
                    displayMessage: "Internal Server Error"
                }
            }
            const data = await response.json() as Guild[];
            const guildMap = {} as Record<string, Guild>
            data.forEach((guild) => guildMap[guild.id] = guild)
            if (localStorage.getItem("guild")) {
                const chosenGuild = data.find((guild) => guild.id === localStorage.getItem("guild"));
                set((state) => ({ ...state, loading: false, error: undefined, guilds: guildMap, status: 200, chosenGuild }));
                return {
                    guilds: data,
                    message: "Success",
                    status: 200,
                    displayMessage: "Success"
                }
            }
            set((state) => ({ ...state, loading: false, error: undefined, guilds: guildMap, status: 200 }));
            return {
                guilds: data,
                message: "Success",
                status: 200,
                displayMessage: "Success"
            }
        } catch (e) {
            set({ loading: false, error: `Internal Server Error: ${e}`, guilds: {}, status: 500 });
            return {
                guilds: [],
                message: `Internal Server Error: ${e}`,
                status: 500,
                displayMessage: "Internal Server Error"
            }
        }
    },
    choseGuild: (id) => () => {
        const chosenGuild = get().guilds[id]
        if (!chosenGuild) return
        window.localStorage.setItem("guild", id)
        set(() => ({ chosenGuild: chosenGuild }))
    },
    setGuild: (guild) =>
        set((state) => ({ ...state, guilds: { ...state.guilds, [guild.id]: guild } }))
}))