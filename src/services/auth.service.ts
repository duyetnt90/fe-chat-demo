import {login, register} from "../api/auth.api";
import {cache} from "../cache/cache";
import type {RegisterPayload, User} from "../types/auth.type";

const USER_KEY = "current_user";
const TOKEN_USER = "token_user";

export const authService = {
    async login(data: { email: string; password: string }): Promise<User> {
        const res = await login(data);

        const dataLogin = res.data;
        const user = dataLogin?.user;
        const token = dataLogin?.token;
        cache.set(USER_KEY, user);
        cache.set(TOKEN_USER, token);

        localStorage.setItem(USER_KEY, JSON.stringify(user));
        localStorage.setItem(TOKEN_USER, token);

        return user;
    },

    async register(data: RegisterPayload): Promise<User> {
        const res = await register(data);

        const dataRes = res.data;
        return dataRes?.user;
    },

    getCurrentUser(): User | null {
        // 1. check memory trước
        const cached = cache.get(USER_KEY);
        if (cached) {
            return cached;
        }
        // 2. fallback localStorage
        const stored = localStorage.getItem(USER_KEY);

        if (stored) {
            const user = JSON.parse(stored);
            cache.set(USER_KEY, user);
            return user;
        }
        return null;
    },

    setCurrentUser(user): User | null {
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