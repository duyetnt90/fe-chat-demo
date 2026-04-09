import api from "./axios";
import type { RegisterPayload, User } from "../types/auth.type";

export const register = (data: RegisterPayload) => {
    return api.post<User>("/auth/register", data);
};

export const login = (data: {
    email: string;
    password: string;
}) => {
    return api.post<User>("/auth/login", data);
};