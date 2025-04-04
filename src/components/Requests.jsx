import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestsSlice';

const Requests = () => {
    
    const dispatch = useDispatch();
    const requests = useSelector((store)=>store.requests);

    const reviewRequest = async (status , _id)=>{
      try{
        const res = await axios.post( BASE_URL+ "/request/review/" + status+ "/" + _id, {}, 
          {withCredentials: true});
        dispatch(removeRequest(_id));
      }
      catch(err){
        console.log(err);
      }
    }

    const fetchRequest = async ()=>{
        try{
            const res = await axios.get(BASE_URL + "/user/requests/received",
            {withCredentials: true,
        });
            console.log(res);
            dispatch(addRequests(res.data.data));
            }
            catch(err){
            console.log(err);
            }
    };
    useEffect(() => {
        fetchRequest();
      }, []);

      if (!requests) return null;

      if (requests.length === 0)
        return <h1 className="flex justify-center my-10 font-serif text-pink-600 text-xl"> No Requests Found..</h1>;
    
      return (
        <div className="text-center my-10 font-serif ">  
            <h1 className="text-bold text-pink-700 text-2xl">Connection Requests</h1>
    
          {requests.map((request) => {
            const { _id, firstName, lastName, about } =
              request?.fromUserId;
    
            return (
              <div
                key={_id}
                className=" flex justify-between items-center m-4 p-4 rounded-lg bg-purple-100 outline-2 outline-purple-400 w-1/3 mx-auto"
              >
                <div>
                  <img
                    alt="photo"
                    className="w-20 h-20 rounded-full"
                    src="https://wemeancareer.com/wp-content/uploads/2020/04/Professional-LinkedIn-Headshot.png"
                  />
                </div>
                <div className="text-left mx-4">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                  {/* {age && gender && <p>{age + ", " + gender}</p>} */}
                  <p>{about}</p>
                </div>
                <div>
                  <button
                    className="btn btn-outline btn-accent p-2"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-outline btn-secondary mx-2 p-2"
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      );
    };
    export default Requests;