import {createConversation,} from "../api/conversation.api";
import type {User} from "../types/auth.type.ts";

let cache: any[] = [];

export const conversationService = {
    async createConversationUserSelect(user: User, currentUser: User) {
        try {
            return await this.create(
               currentUser._id,
               user._id
           );
        } catch (err) {
            console.error(err);
        }
    },

    async create(senderId: string, receiverId: string) {
        const res = await createConversation({ senderId, receiverId });

        cache.push(res.data);

        return res.data;
    },
};