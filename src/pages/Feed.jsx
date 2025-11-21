import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import FeedProfileCard from '../components/FeedProfileCard';

const Feed = () => {

    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const getFeed = async () => {
        try {
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
            dispatch(addFeed(res?.data));
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        getFeed();
    }, []);

    if(!feed) return;

    if(feed.length <= 0) return <h1 className='text-center w-full text-gray-600 px-2 sm:px-5 font-medium sm:text-2xl'>You have reached the end</h1>

  return (
    <div className='w-full px-2'>
        {/* {console.log(feed[0])} */}
        <link rel="manifest" href="manifest.json" />
        <div className=' w-full flex justify-center'>
            <FeedProfileCard user={feed[0]} />
        </div>
    </div>
  )
}

export default Feed;