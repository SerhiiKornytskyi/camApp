const TOKEN_KEY = "camapp_token";

export const getToken = (): string | null => {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
        console.error("Error getting token from localStorage:", error);
        return null;
    }
};
    
export const setToken = (token: string) => {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        localStorage.setItem(TOKEN_KEY, token);  
    }
    catch (error) {
        console.error("Error setting token in localStorage:", error);
    }
};

export const removeToken = () => {
    if (typeof window === "undefined") {
        return null;
    }

    try {
        localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
        console.error("Error removing token from localStorage:", error);
    }
};