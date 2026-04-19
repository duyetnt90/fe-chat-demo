import {login, register} from "../api/auth.api";
import {cache} from "../cache/cache";
import type {AuthResponse, LoginPayload, RegisterPayload, User} from "../types/auth.type";
import type {AxiosResponse} from "axios";

const USER_KEY = "current_user";
const TOKEN_USER = "token_user";

export const authService = {
    async login(data: LoginPayload): Promise<User> {
        const res: AxiosResponse = await login(data);

        const dataLogin: AuthResponse = res.data;
        const user: User = dataLogin.user;
        const token: string = dataLogin.token;
        cache.set(USER_KEY, user);
        cache.set(TOKEN_USER, token);

        localStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem(TOKEN_USER, token);

        return user;
    },

    async register(data: RegisterPayload): Promise<User> {
        const res: AxiosResponse = await register(data);

        return res.data;
    },

    getCurrentUser() {
        try {
            // 1. check memory
            let user: User | null = cache.get(USER_KEY);
            if (user) {
                return user;
            }
            // 2. fallback localStorage
            const stored = localStorage.getItem(USER_KEY);

            if (stored) {
                user = JSON.parse(stored);
                cache.set(USER_KEY, user);
                return user;
            }

            return null;
        } catch (err) {
            console.error(err)
            return null;
        }

    },

    setCurrentUser(user: User): void {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        cache.set(USER_KEY, user);
    },

    getToken() {
        const token = cache.get(TOKEN_USER);
        if (token) {
            return token;
        }
        const cacheToken = localStorage.getItem(TOKEN_USER);

        if (cacheToken) {
            return cacheToken;
        }
        return null;
    },

    logout() {
        cache.delete(USER_KEY);
        cache.delete(TOKEN_USER);
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(TOKEN_USER);
    }
};