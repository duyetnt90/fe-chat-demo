import { useEffect } from "react";
import { conversationService } from "../services/conversation.service";
import { authService } from "../services/auth.service";
import { useChat } from "../hooks/userChat.ts";
import type {User} from "../types/auth.type.ts";

export default function ConversationList() {
    const { conversations, setConversations, setCurrentChat } = useChat();

    useEffect(() => {
        const user: User = authService.getCurrentUser();

        conversationService.getAll(user._id).then(setConversations);
    }, []);

    const createChat = async () => {
        const user: User = authService.getCurrentUser();
        const receiverId = "69d7389b377c5331269d72d3";
        const conv = await conversationService.create(
            user._id,
            receiverId
        );

        setConversations((prev: any) => {
            const exists = prev.find((c) => c._id === conv._id);
            if (exists) return prev;
            return [...prev, conv]
        });
    };

    return (
        <div>
            <h3>Conversations</h3>

            <button onClick={createChat}>New Chat</button>

            {conversations.map((c) => (
                <div
                    key={c._id}
                    onClick={() => setCurrentChat(c)}
                >{c._id}</div>
            ))}
        </div>
    );
}