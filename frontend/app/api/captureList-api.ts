import { CaptureData } from "@/types/types";

export const getCaptureList = async () => {
    const response = await fetch('/api/videos', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) throw new Error('Failed to fetch captured list');
    return response.json() as Promise<CaptureData[]>;
}
