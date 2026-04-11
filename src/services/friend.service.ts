import { getFriends, sendRequest, accept, getRequests} from "../api/friend.api.ts";

export const friendService = {
    async getFriends(userId: string): Promise<any> {
        const res = await getFriends(userId);
        return res.data;
    },
    async sendRequest (receiverId: string) {
        const res = await sendRequest(receiverId);
        return res.data;
    },
    async accept (id: string) {
        const res = await accept(id);
        return res.data;
    },
    async getRequests () {
        const res = await getRequests();
        return res.data;
    },
};