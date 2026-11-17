import {useQuery} from '@tanstack/react-query';
import {getCaptureList} from '../api/captureList-api';
import {removeToken, setToken, getToken} from '../utils/token-utils';

const useCaptureListQuery = () => {
    return useQuery({
        queryKey: ['videos'],
        queryFn: getCaptureList,
        refetchInterval: 8000, // Refetch every 8 seconds  
    })
}

export default useCaptureListQuery;