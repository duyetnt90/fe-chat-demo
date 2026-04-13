import { createContext, useState } from "react";
import { useEffect } from "react";
import { conversationService } from "../services/conversation.service";
import { authService } from "../services/auth.service";

export const ChatContext = createContext<any>(null);

export const ChatProvider = ({ children }: any) => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const user = authService.getCurrentUser();
                if (!user) return;

                const data = await conversationService.getConversations(user._id);
                setConversations(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchConversations();
    }, []);

    return (
        <ChatContext.Provider
            value={{
                conversations,
                setConversations,
                currentChat,
                setCurrentChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};