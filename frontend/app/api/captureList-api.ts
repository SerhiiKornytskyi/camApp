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
    const captures = (await response.json()) as CaptureData[];
    // <video> can't send headers, so pass the token as a query param
    return captures.map(cap => ({
        name: cap.name,
        url: `${cap.url}?token=${encodeURIComponent(token ?? "")}`,
    }));
}
