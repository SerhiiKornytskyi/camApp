import { TriggerData } from "@/types/types";

export const getTriggerStatus = async () => {
    const response = await fetch('/api/trigger', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) throw new Error('Failed to fetch trigger status');
    return response.json() as Promise<TriggerData>;
}


