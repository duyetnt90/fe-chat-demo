
import ChatBox from "../components/ChatBox";
import FriendList from "../components/FriendList";
import SearchUser from "../components/SearchUser";
import FriendRequestList from "../components/FriendRequestList";

export default function ChatPage() {
    return (
        <div className="d-flex box-chat-vh-95">

            {/* Sidebar */}
            <div className="border-end p-3" style={{width: 300}}>
                <h5 className="mb-3">Chat App</h5>

                <SearchUser/>
                <hr/>
                <FriendRequestList/>
                <hr/>
                <FriendList/>
            </div>

            {/* Chat */}
            <div className="flex-grow-1 d-flex flex-column">
                <ChatBox/>
            </div>
        </div>
    );
}