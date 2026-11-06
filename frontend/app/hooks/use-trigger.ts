import {useQuery} from '@tanstack/react-query';
import {getTriggerStatus} from '../api/trigger-api';
import { TriggerData } from '../../types/types';

const useTriggerQuery = () => {
    return useQuery({
        queryKey: ['trigger'],
        queryFn: getTriggerStatus,
        refetchInterval: 5000, // Refetch every 5 seconds  
    })
}

export default useTriggerQuery;