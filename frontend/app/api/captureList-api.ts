import { CaptureData } from "@/types/types";
import {getToken} from '../utils/token-utils';

export const getCaptureList = async () => {
    
    const token = await getToken();

    const response = await fetch('/api/videos', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    if (!response.ok) throw new Error('Failed to fetch captured list');
    return response.json() as Promise<CaptureData[]>;
}
