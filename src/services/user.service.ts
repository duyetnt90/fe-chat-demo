import api from "../api/axios";
import { cache } from "../cache/cache";
import type { User } from "../types/auth.type";

export const userService = {
    async getUser(id: string): Promise<User> {
        const cacheKey = `user_${id}`;

        const cached = cache.get<User>(cacheKey);
        if (cached) return cached;

        const res = await api.get<User>(`/users/${id}`);

        cache.set(cacheKey, res.data);

        return res.data;
    }
};