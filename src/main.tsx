import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ChatProvider } from "./context/chat.context.tsx";
import { AuthProvider } from "./context/auth.context.tsx";
//import bootstrap
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <ChatProvider>
              <App />
          </ChatProvider>
      </AuthProvider>
  </StrictMode>,
)
