import api from "./axios";

export const getFriends = async (userId) => {
    return await api.get(`/friends/${userId}`);
};

export const sendRequest = async (toUserId) => {
    return await api.post("/friend-request", { toUserId });
};

export const accept = async (id) => {
    return await api.put(`/friend-request/${id}/accept`);
};

export const getRequests = async () => {
    return await api.get("/friend-request");
};