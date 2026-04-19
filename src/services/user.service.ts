import {update, getMe, search} from "../api/user.api.ts";
import { cache } from "../cache/cache";
import type { User } from "../types/auth.type";
const USER_KEY = "current_user";

export const userService = {
    async getMe(): Promise<User> {
        const user: User | null = cache.get<User>(USER_KEY);
        if (user) {
            return user;
        }

        const res = await getMe();

        cache.set(USER_KEY, res.data);

        return res.data;
    },

    update: async (data: FormData) => {
        const res = await update(data);
        return res.data;
    },

    search: async (keyword: string) => {
        const res = await search(keyword);
        return res.data;
    }
};