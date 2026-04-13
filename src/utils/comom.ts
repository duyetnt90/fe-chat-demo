export const getAvatarUrl = (avatar: string) => {
    if (!avatar) {
        return `${import.meta.env.VITE_SOCKET_URL}/avatar/avatar_default.png`;
    }

    // Preview
    if (avatar.startsWith("blob:")) return avatar;

    // Full url avatar
    if (avatar.startsWith("http")) return avatar;

    return `${import.meta.env.VITE_SOCKET_URL}${avatar}`;
};