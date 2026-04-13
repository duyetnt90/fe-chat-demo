import { useEffect, useState } from "react";
import { friendService } from "../services/friend.service";
import styles from "./FriendRequestList.module.css";

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
        <div className={styles.friendRequests}>
            <h4 className={styles.title}>Friend Requests</h4>

            {requests.map((record) => (
                <div key={record._id} className={styles.requestItem}>
                    <div className={styles.userInfo}>
                        <div className={styles.avatar}></div>
                        <span className={styles.username}>
                    {record.fromUserId.name}
                </span>
                    </div>

                    <button
                        className={styles.btnAccept}
                        onClick={() => accept(record._id)}
                    >
                        Accept
                    </button>
                </div>
            ))}
        </div>
    );
}