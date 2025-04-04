import React, { useState } from 'react';
import UserCards from './UserCards';
import {BASE_URL} from '../utils/constant';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {

    const [firstName,setFirstName] = useState(user.firstName);
    const [lastName,setLastName] = useState(user.lastName);
    const [age,setAge] = useState("23"); 
    const [gender,setGender] = useState("female"); 
    const [error, setError] = useState("");
    const [about,setAbout] = useState(user.about); 
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    
    const SaveProfile = async ()=>{
      setError("");
      try {
        const res = await axios.patch(
          BASE_URL + "/profile/edit",
          {
            firstName,
            lastName,
            about,
          },
          { withCredentials: true }
        );
        dispatch(addUser(res?.data?.data));
        setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      }
      catch(err){
        setError(err.message || "Failed to update profile");  
      console.error(err); 
      }
    };

  return (
    <>
    <div className='flex justify-center my-10'>
      <div className='flex justify-center mx-10 font-serif'>
        <div className="card outline-2 outline-purple-400 w-96 shadow-sm">
      <div className="card-body">
      <h2 className="card-title justify-center text-pink-600">Edit Profile</h2>
      <div>
      <fieldset className="fieldset w-xs bg-purple-100 border border-base-300 p-4 rounded-box">
    
          <label className="fieldset-label">First Name : </label>
          <input type="text" className="input" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
          <label className="fieldset-label">Last Name : </label>
          <input type="text" className="input" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
          <label className="fieldset-label">Age : </label>
          <input type="text" className="input" value={age} onChange={(e)=>setAge(e.target.value)} />
          <label className="fieldset-label">Gender </label>
          <input type="text" className="input" value={gender} onChange={(e)=>setGender(e.target.value)}/>
          <label className="fieldset-label">About :</label>
          <input type="text" className="input" value={about} onChange={(e)=>setAbout(e.target.value)} />
      </fieldset>
      </div>
      <p className="text-red-500">{error}</p>
      <div className="card-actions justify-center ">
        <button className="btn btn-outline btn-secondary " onClick={SaveProfile}>Save Changes</button>
      </div>
    </div>
    </div>
      </div>
      <UserCards user={{firstName,lastName,about}}/>
    </div>
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile saved successfully.</span>
            </div>
          </div>
        )}
    </>
  );
}

export default EditProfile;
