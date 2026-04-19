import api from "./axios";

export const getFriends = async (userId: string) => {
    return await api.get(`/friends/${userId}`);
};

export const sendRequest = async (toUserId: string) => {
    return await api.post("/friend-request", { toUserId });
};

export const accept = async (id: string) => {
    return await api.put(`/friend-request/${id}/accept`);
};

export const getRequests = async () => {
    return await api.get("/friend-request");
};