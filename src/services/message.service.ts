import { getMessages, sendMessageApi } from "../api/message.api";
import type {MessagePayload} from "../types/message.type.ts";

const cache: Record<string, any[]> = {};

export const messageService = {
    async get(conversationId: string) {
        if (cache[conversationId]) return cache[conversationId];

        const res = await getMessages(conversationId);
        cache[conversationId] = res.data;

        return res.data;
    },

    async send(data: MessagePayload) {
        const res = await sendMessageApi(data);

        if (!cache[data.conversationId]) {
            cache[data.conversationId] = [];
        }

        cache[data.conversationId].push(res.data);

        return res.data;
    },
};