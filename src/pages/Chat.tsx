// import ChatBox from "../components/ChatBox";
// import UserList from "../components/UserList";
// import FriendList from "../components/FriendList.tsx";
//
// export default function ChatPage() {
//     return (
//         <div style={{ display: "flex", gap: 20 }}>
//             <UserList />
//             <FriendList />
//             <ChatBox />
//         </div>
//     );
// }

import ChatBox from "../components/ChatBox";
import FriendList from "../components/FriendList";
import SearchUser from "../components/SearchUser";
import FriendRequestList from "../components/FriendRequestList";

export default function ChatPage() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>

            {/* Sidebar */}
            <div style={{ width: 300, borderRight: "1px solid #ddd", padding: 10 }}>
                <SearchUser />
                <FriendRequestList />
                <FriendList />
            </div>

            {/* Chat area */}
            <div style={{ flex: 1, padding: 10 }}>
                <ChatBox />
            </div>
        </div>
    );
}