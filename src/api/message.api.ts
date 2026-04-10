import api from "./axios.ts"

export const getMessages = async (conversationId: string) => {
    return await api.get(`/messages/${conversationId}`);
};

export const sendMessageApi = async (data: any) => {
    return await api.post("/messages", data);
};