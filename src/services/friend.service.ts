import { getFriends, sendRequest, accept, getRequests} from "../api/friend.api.ts";
import type {User} from "../types/auth.type.ts";
import type {AxiosResponse} from "axios";

export const friendService = {
    async getFriends(userId: string): Promise<User[]> {
        const res: AxiosResponse<[]> = await getFriends(userId);
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
    async getRequests (): Promise<[]> {
        const res: AxiosResponse<[]>  = await getRequests();
        return res.data;
    },
};