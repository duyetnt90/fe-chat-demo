import { login, register } from "../api/auth.api";
import { cache } from "../cache/cache";
import type { RegisterPayload, User } from "../types/auth.type";

const USER_KEY = "current_user";

export const authService = {
    async login(data: { email: string; password: string }): Promise<User> {
        const res = await login(data);

        const user = res.data;
        console.log("user ==> ", user)
        cache.set(USER_KEY, user);

        localStorage.setItem(USER_KEY, JSON.stringify(user));

        return user;
    },

    async register(data: RegisterPayload): Promise<User> {
        const res = await register(data);

        const user = res.data;

        cache.set(USER_KEY, user);
        localStorage.setItem(USER_KEY, JSON.stringify(user));

        return user;
    },

    getCurrentUser(): User | null {
        // 1. check memory trước
        const cached = cache.get(USER_KEY);
        if (cached) {
            return cached?.user;
        }
        // 2. fallback localStorage
        const stored = localStorage.getItem(USER_KEY);

        if (stored) {
            const user = JSON.parse(stored);
            // sync lại memory
            cache.set(USER_KEY, user);
            return user;
        }
        return null;
    },

    logout() {
        cache.delete(USER_KEY);
    }
};