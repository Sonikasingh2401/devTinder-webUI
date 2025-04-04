import axios from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import {BASE_URL} from '../utils/constant';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCards = ({ user }) => {
    const { _id, firstName, lastName, about } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status,userId)=>{
      try{
        const res = await axios.post(BASE_URL + "/request/send/" + status+ "/" + userId, {},
          {withCredentials : true,}
        );
        dispatch(removeUserFromFeed(userId));
      }
      catch(err){
        console.log(err);
      }
    };

  return (
    <div>
      <div className="card bg-purple-100 w-96 shadow-sm">
  <figure>
    <img 
      src="https://www.venmond.com/demo/vendroid/img/avatar/big.jpg"
      alt="Photo"  />
  </figure>
  <div className="card-body p-2">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    <p>{about}</p>
    <div className="card-actions justify-center">
        <button className="btn btn-outline btn-secondary " onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
        <button className="btn btn-outline btn-success" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
    </div>
  </div>
</div>
    </div>
  );
}

export default UserCards;
