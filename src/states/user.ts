import { create } from "zustand";
import { API_URL } from "../constants";
import { User } from "../types";

type State = {
  user?: User;
  loading: boolean;
  error?: string;
  status?: number;
  isLogout: boolean;
  token?: string;
};
type ApiResponse = {
  user?: User;
  message: string;
  status: number;
  displayMessage: string;
};
type Actions = {
  checkUser: (autoRedirect?: boolean) => Promise<ApiResponse>;
  logout: () => void;
  redirectAuth: () => void;
  setUser: (user: User) => void;
};

const initialState: State = {
  user: undefined,
  loading: true,
  isLogout: false,
  token: localStorage.getItem("token") || undefined,
};
export const redirectAuth = () => {
  const url = new URL(window.location.href);
  const callbackUrl = `${url.protocol}//${url.host}/callback`;
  const state = JSON.stringify({ redirectTo: url.pathname });
  const redirectUrl = `${API_URL}/api/auth/getOAuthUrl?redirect=${callbackUrl}&state=${encodeURIComponent(state)}`;
  window.location.replace(redirectUrl);
};
export const useUserStore = create<State & Actions>((set) => ({
  ...initialState,
  checkUser: async (autoRedirect) => {
    set((state) => ({ ...state, loading: true }));
    console.log("Checking user");
    if (!window.localStorage.getItem("token")) {
      if (!autoRedirect) {
        set({
          loading: false,
          error: "Unauthorized",
          user: undefined,
          status: 401,
        });
        return {
          user: undefined,
          message: "Unauthorized",
          status: 401,
          displayMessage: "Unauthorized",
        };
      }
      redirectAuth();
      set({
        loading: false,
        error: "Unauthorized",
        user: undefined,
        status: 401,
      });
      return {
        user: undefined,
        message: "Unauthorized",
        status: 401,
        displayMessage: "Unauthorized",
      };
    }
    try {
      const response = await fetch(`${API_URL}/api/user/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      if (response.status === 401) {
        localStorage.removeItem("token");
        if (!autoRedirect) {
          set({
            loading: false,
            error: "Unauthorized",
            user: undefined,
            status: 401,
          });
          return {
            user: undefined,
            message: "Unauthorized",
            status: 401,
            displayMessage: "Unauthorized",
          };
        }
        redirectAuth();
        set({
          loading: false,
          error: "Unauthorized",
          user: undefined,
          status: 401,
        });
        return {
          user: undefined,
          message: "Unauthorized",
          status: 401,
          displayMessage: "Unauthorized",
        };
      } else if (response.status === 500) {
        set({
          loading: false,
          error: "An error occurred",
          user: undefined,
          status: 500,
        });
        return {
          user: undefined,
          message: "An error occurred",
          status: 500,
          displayMessage: "An error occurred",
        };
      }
      const data = (await response.json()) as User;
      set({
        user: data,
        loading: false,
        error: undefined,
        status: 200,
        token: localStorage.getItem("token") || undefined,
      });
      return {
        user: data,
        message: "User found",
        status: 200,
        displayMessage: "User found",
      };
    } catch (error) {
      set({
        loading: false,
        error: `An error occurred: ${error}`,
        user: undefined,
        status: 500,
      });
      return {
        user: undefined,
        message: `An error occurred: ${error}`,
        status: 500,
        displayMessage: "An error occurred",
      };
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({
      user: undefined,
      loading: false,
      error: undefined,
      status: undefined,
      isLogout: true,
    });
  },
  redirectAuth,
  setUser: (user) => set({ user }),
}));
