import { useContext } from "react";
import { ChatContext } from "../context/chat.context";
import { conversationService } from "../services/conversation.service";
import { authService } from "../services/auth.service";
import type {User} from "../types/auth.type.ts";

export const useChat = () => {
    const context = useContext(ChatContext);

    if (!context) {
        throw new Error("useChat must be used within ChatProvider");
    }

    const { setConversations, setCurrentChat, conversations } = context;

    /**
     * @function create new conversation
     * @param user
     */
    const openChat = async (user: User) => {
        try {
            const existing = conversations.find((c: any) =>
                c.members.some((m: any) => m._id === user._id)
            );

            if (existing) {
                setCurrentChat(existing);
                return existing;
            }

            const currentUser = authService.getCurrentUser();

            const conv = await conversationService.createConversationUserSelect(
                user,
                currentUser
            );

            setConversations((prev: any[]) => {
                const exists = prev.find((c) => c._id === conv._id);
                if (exists) return prev;
                return [...prev, conv];
            });

            setCurrentChat(conv);

            return conv;
        } catch (err) {
            console.error(err);
        }
    };

    return {
        ...context,
        openChat,
    };
};