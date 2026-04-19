import api from "./axios";

export const update = async (data: FormData) => {
    return await api.put("/user/profile", data);
};

export const getMe = async () => {
    return await api.get(`/user/profile`);
};
export const search = async (keyword: string) => {
    return await api.get(`/user/search/${keyword}`);
};