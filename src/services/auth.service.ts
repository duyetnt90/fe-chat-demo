import { login, register } from "../api/auth.api";
import { cache } from "../cache/cache";
import type { RegisterPayload, User } from "../types/auth.type";

const USER_KEY = "current_user";

export const authService = {
    async login(data: { email: string; password: string }): Promise<User> {
        const res = await login(data);

        const user = res.data;

        cache.set(USER_KEY, user);

        return user;
    },

    async register(data: RegisterPayload): Promise<User> {
        const res = await register(data);

        const user = res.data;

        cache.set(USER_KEY, user);

        return user;
    },

    getCurrentUser(): User | null {
        return cache.get<User>(USER_KEY);
    },

    logout() {
        cache.delete(USER_KEY);
    }
};