import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import UserCards from './UserCards';

const Feed = () => {

  const feed = useSelector((store) =>store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL+ "/user/feed", {withCredentials: true,})
      dispatch(addFeed(res?.data?.data));

    }
    catch(err){
      console.log(err.message);
    }
  };

  useEffect(()=>{
    getFeed();
  },[]);


  return (
    feed && (
    <div className='flex justify-center my-4 '>
      <UserCards user={feed[0]} />
    </div>
    )
  );
}

export default Feed;
