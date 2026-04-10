import AppRouter from "./router";
import { useEffect } from "react";
import { socketService } from "./socket/socket.service.ts";
import { authService } from "./services/auth.service.ts";

function App() {
    useEffect(() => {
        const user = authService.getCurrentUser();

        if (user?._id) {
            socketService.connect(user._id);
        }
    }, []);

    return <AppRouter />;
}

export default App;