import {useQuery} from '@tanstack/react-query';
import {getPosts} from '../api/posts-api';


const usePosts = () => {
    return useQuery({
        queryKey: ['posts'],
        queryFn: getPosts
    });
}


export default usePosts;
