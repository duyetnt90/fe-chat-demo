import api from "./axios";
import type {LoginPayload, RegisterPayload, User} from "../types/auth.type";

export const register = async (data: RegisterPayload) => {
    return await api.post<User>("/auth/register", data);
};

export const login = async (data: LoginPayload) => {
    return await api.post<User>("/auth/login", data);
};