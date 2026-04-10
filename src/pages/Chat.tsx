import ConversationList from "../components/ConversationList";
import ChatBox from "../components/ChatBox";
import UserList from "../components/UserList";

export default function ChatPage() {
    return (
        <div style={{ display: "flex", gap: 20 }}>
            <UserList />
            {/*<ConversationList />*/}
            <ChatBox />
        </div>
    );
}