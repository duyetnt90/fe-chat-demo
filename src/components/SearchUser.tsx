import { useState } from "react";
import { userService } from "../services/user.service";
import { friendService } from "../services/friend.service";

export default function SearchUser() {
    const [keyword, setKeyword] = useState("");
    const [users, setUsers] = useState<any[]>([]);

    const search = async () => {
        const res = await userService.search(keyword);
        setUsers(res);
    };

    const addFriend = async (id: string) => {
        await friendService.sendRequest(id);
        alert("Sent request");
    };

    return (
        <div>
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search user..."
            />
            <button onClick={search}>Search</button>

            {users.map((u) => (
                <div key={u._id}>
                    {u.username}
                    <button onClick={() => addFriend(u._id)}>
                        Add friend
                    </button>
                </div>
            ))}
        </div>
    );
}