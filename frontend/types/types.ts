export type User ={ id: string; username: string };

export type LoginResponse = {
    message: string;
    token: string;
};

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export type UseLoginReturnType = {
    user: User | undefined;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: Error | null;
}

export type TriggerData = {
    message: string;
    count: number;
}