import api from "./axios";

export const getUsers = async (userId: string) => {
    return await api.get(`/user/get-all/${userId}`);
};

export const findUserById = async (userId: string) => {
    return await api.get(`/user/${userId}`);
};