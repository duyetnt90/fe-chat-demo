import api from "./axios";
import type {User} from "../types/auth.type.ts";

export const update = async (data: User) => {
    return await api.put(`/user/profile`, data);
};

export const getMe = async () => {
    return await api.get(`/user/profile`);
};
export const search = async (keyword: string) => {
    return await api.get(`/user/search/${keyword}`);
};