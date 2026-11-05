// useQuery — retrieve data from your backend.
// useMutation — change data on your backend.
// useQueryClient — control the cache and coordinate queries.

import {useQuery, useQueryClient, useMutation} from '@tanstack/react-query';

import { login, getMe, ApiError } from '../api/auth-api';
import { AuthStatus, UseLoginReturnType, User } from '../../types/types';
import {removeToken, setToken, getToken} from '../utils/token-utils';

export const ME_QUERY_KEY = 'me';

async function fetchCurrentUser (): Promise<User> {
    const token = getToken();

    if (!token) {
        throw new Error('No token found');
    }
    try {
        const user = await getMe(token);
        return user;
    } catch (error) {
        removeToken();
        throw new Error('User retrieval failed, local token cleared');
    }
}

export function useAuth (): UseLoginReturnType {
    const query = useQuery({  
        queryKey: [ME_QUERY_KEY],
        queryFn: fetchCurrentUser,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    return {
        user: query.data,
        isLoggedIn: Boolean(query.data),
        isLoading: query.isLoading,
        error: query.error,
    }
}

export function useLogin() {
    // access queryClient provided by the QueryClientProvider in app's root component
    const queryClient = useQueryClient();
    
    // mutation is used for creating/updating/deleting data on the server
    // here we use it for login, which is a state-changing operation
    return useMutation({
        mutationFn: async ({ username, password }: { username: string; password: string }) => {
            const response = await login(username, password);
            setToken(response.token);
            return getMe(response.token);
        },
        onSuccess: (user) => {
            queryClient.setQueryData([ME_QUERY_KEY], user);
        },
        onError: (error) => {
            if (error instanceof ApiError) {
                console.error(`API Error: ${error.status} - ${error.message}`);
            }
            removeToken();
        }
    });
}

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    removeToken();
    queryClient.setQueryData([ME_QUERY_KEY], null);
  };
};
    
