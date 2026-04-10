import AppRouter from "./router";
import { useEffect } from "react";
import { socketService } from "./socket/socket.service.ts";
import { authService } from "./services/auth.service.ts";
import type {User} from "./types/auth.type.ts";

function App() {
    useEffect(() => {
        const user: User = authService.getCurrentUser();

        if (user?._id) {
            socketService.connect(user._id);
        }
    }, []);

    return <AppRouter />;
}

export default App;