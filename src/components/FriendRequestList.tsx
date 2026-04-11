import { useEffect, useState } from "react";
import { friendService } from "../services/friend.service";

export default function FriendRequestList() {
    const [requests, setRequests] = useState<any[]>([]);

    useEffect(() => {
        friendService.getRequests().then(setRequests);
    }, []);

    const accept = async (id: string) => {
        await friendService.accept(id);
        setRequests((prev) => prev.filter((record) => record._id !== id));
    };

    return (
        <div>
            <h4>Friend Requests</h4>
            {requests.map((record) => (
                <div key={record._id}>
                    {record.fromUserId.username}
                    <button onClick={() => accept(record._id)}>
                        Accept
                    </button>
                </div>
            ))}
        </div>
    );
}