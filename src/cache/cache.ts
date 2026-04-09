type CacheData<T> = {
    data: T;
    expiry: number;
};

class Cache {
    private store = new Map<string, CacheData<any>>();

    set<T>(key: string, data: T, ttl = 5 * 60 * 1000) {
        this.store.set(key, {
            data,
            expiry: Date.now() + ttl
        });
    }

    get<T>(key: string): T | null {
        const item = this.store.get(key);

        if (!item) return null;

        if (Date.now() > item.expiry) {
            this.store.delete(key);
            return null;
        }

        return item.data;
    }

    delete(key: string) {
        this.store.delete(key);
    }

    clear() {
        this.store.clear();
    }
}

export const cache = new Cache();