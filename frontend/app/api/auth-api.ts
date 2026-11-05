import { LoginResponse, User } from "../../types/types";

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        throw new Error("Login failed");
    }
    return response.json() as Promise<LoginResponse>;
};

export const getMe = async (token: string): Promise<User> => {

    const response = await fetch("/api/me", { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }

    return response.json() as Promise<User>;
};

export class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = "ApiError";
    }
}