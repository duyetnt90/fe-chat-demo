import {
    getConversations,
    createConversation,
} from "../api/conversation.api";

let cache: any[] = [];

export const conversationService = {
    async getAll(userId: string) {
        if (cache.length) return cache;

        const res = await getConversations(userId);
        cache = res.data;

        return cache;
    },

    async create(senderId: string, receiverId: string) {
        const res = await createConversation({ senderId, receiverId });

        cache.push(res.data);

        return res.data;
    },
};