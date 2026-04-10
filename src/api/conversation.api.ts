import api from "./axios";

export const getConversations = (userId: string) => {
    return api.get(`/conversations/${userId}`);
};

export const createConversation = (data: {
    senderId: string;
    receiverId: string;
}) => {
    return api.post("/conversations", data);
};