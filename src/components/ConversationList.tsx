import { useEffect } from "react";
import { conversationService } from "../services/conversation.service";
import { authService } from "../services/auth.service";
import { useChat } from "../hooks/userChat.ts";

export default function ConversationList() {
    const { conversations, setConversations, setCurrentChat } = useChat();

    useEffect(() => {
        const { user } = authService.getCurrentUser();

        conversationService.getAll(user._id).then(setConversations);
    }, []);

    const createChat = async () => {
        const {user} = authService.getCurrentUser();

        // 👉 tạm hardcode user khác để test
        const receiverId = "6801a2b3c4d5e6f7a8b9c0d1";

        const conv = await conversationService.create(
            user._id,
            receiverId
        );

        setConversations((prev: any) => [...prev, conv]);
    };

    return (
        <div>
            <h3>Conversations</h3>

            <button onClick={createChat}>New Chat</button>

            {conversations.map((c: any) => (
                <div key={c._id} onClick={() => setCurrentChat(c)}>
                    {c._id}
                </div>
            ))}
        </div>
    );
}