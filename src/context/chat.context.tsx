import { createContext, useState } from "react";

export const ChatContext = createContext<any>(null);

export const ChatProvider = ({ children }: any) => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

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