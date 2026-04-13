
# Chat App Frontend 🚀

## 📌 Overview
## Requirement Node >= 20.x
Frontend cho ứng dụng chat realtime, cung cấp:

* Đăng ký / Đăng nhập
* Tìm kiếm user
* Kết bạn
* Chat realtime (Socket.io)
* Profile (avatar, thông tin cá nhân)

---

## 🛠 Tech Stack

* React + TypeScript
* Vite
* Bootstrap
* Socket.io-client
* Axios

---

## 📁 Project Structure

```bash
src/
├── api/            # Axios config (baseURL, interceptor, attach token)
├── assets/         # Static assets (images, icons...)
├── cache/          # Local cache (optional, optimize performance)
├── components/     # Reusable UI components (ChatBox, FriendList...)
├── context/        # Global state (AuthContext, ChatContext...)
├── hooks/          # Business logic (useChat, useAuth...)
├── pages/          # Page-level components (ChatPage, ProfilePage...)
├── router/         # Routing (React Router config, ProtectedRoute...)
├── services/       # API calls (auth, message, conversation, friend...)
├── socket/         # Socket connection & events handler
├── types/          # TypeScript types/interfaces
├── utils/          # Helper functions
├── App.tsx         # Main app
├── main.tsx        # Entry point
```

---

## 🧠 Architecture

```text
Service → API call
Hook → Business logic
Context → Global state
Component → UI
```

---

## ⚙️ Setup

### 1. Clone project

```bash
git clone <repo>
cd fe-chat-demo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment

Tạo file `.env`

```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3001
```

### 4. Run project

```bash
npm run dev
```

---

## 🔐 Authentication Flow

```text
Login/Register
→ lưu user + token (localStorage)
→ AuthContext setUser
→ route protected (/chat)
```

---

## 💬 Chat Flow

```text
Login
→ load conversations
→ chọn user (openChat)
→ load messages
→ send message
→ socket emit → receive realtime
```

---

## 👥 Friend Flow

```text
Search user
→ Add friend
→ Accept request
→ hiển thị FriendList
→ Chat
```

---

## 🔌 Socket Flow

```text
Client connect (userId)
→ join_room(conversationId)
→ send_message
→ receive_message (realtime)
```

---

## 🎨 UI Notes

* Chat UI giống Messenger
* Auto scroll xuống tin nhắn mới
* Avatar hiển thị theo sender
* Sidebar scroll riêng

---

## 🚀 Build

```bash
npm run build
```

---

## 🐳 Docker (optional)

```bash
docker build -t fe-chat .
docker run -p 5173:5173 fe-chat
```

---

## 🌍 Deploy

### Frontend

* Vercel / Netlify

### Env production

```env
VITE_API_URL=https://your-api
VITE_SOCKET_URL=https://your-socket
```

---

## 📈 Future Improvements

* Unread messages
* Last message preview
* Online/offline status
* Typing indicator
* Upload image
* Dark mode

---

## 👨‍💻 Author

Nguyen The Duyet

