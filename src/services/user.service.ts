import {getUsers, findUserById, search} from "../api/user.api.ts";
import { cache } from "../cache/cache";
import type { User } from "../types/auth.type";

export const userService = {
    async getUser(id: string): Promise<User> {
        const cacheKey = `user_${id}`;

        const cached = cache.get<User>(cacheKey);
        if (cached) return cached;

        const res = await findUserById(id);

        cache.set(cacheKey, res.data);

        return res.data;
    },
    getUsers: async (userId: string) => {
        const res = await getUsers(userId);
        return res.data;
    },

    search: async (keyword: string) => {
        const res = await search(keyword);
        return res.data;
    }
};