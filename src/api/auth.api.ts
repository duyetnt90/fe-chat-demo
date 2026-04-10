import api from "./axios";
import type { RegisterPayload, User } from "../types/auth.type";

export const register = async (data: RegisterPayload) => {
    return await api.post<User>("/auth/register", data);
};

export const login = async (data: {
    email: string;
    password: string;
}) => {
    return await api.post<User>("/auth/login", data);
};