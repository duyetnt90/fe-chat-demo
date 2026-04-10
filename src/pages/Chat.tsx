import ConversationList from "../components/ConversationList";
import ChatBox from "../components/ChatBox";

export default function ChatPage() {
    return (
        <div style={{ display: "flex", gap: 20 }}>
            <ConversationList />
            <ChatBox />
        </div>
    );
}