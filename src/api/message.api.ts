import api from "./axios.ts"
import type {MessagePayload} from "../types/message.type.ts";

export const getMessages = async (conversationId: string) => {
    return await api.get(`/messages/${conversationId}`);
};

export const sendMessageApi = async (data: MessagePayload) => {
    return await api.post("/messages", data);
};