import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {

  const [emailId,setEmailId] = useState ("Sonikasingh123@gmail.com");
  const [password,setPassword] = useState ("Sonikasingh**00");
  const [error,setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogin = async ()=>{
    try{
    const res = await axios.post(BASE_URL+'/login',{
      emailId,password
    },
    {withCredentials:true});
    dispatch(addUser(res.data));
    navigate("/feed");

  }
  catch(err){
    setError(err?.response?.data || "Somethng went wrong");
  }
  }

  return (
    <div className='flex justify-center my-15'>
    <div className="card card-border bg-purple-100 w-96">
    <div className="card-body">
      <h2 className="card-title justify-center">Login</h2>
        <div  className='mx-6'>
          <fieldset className="fieldset">
          <legend className="fieldset-legend font-bold" >
            Email ID </legend>
          <input type="text" className="input" value={emailId} onChange={(e)=> setEmailId(e.target.value)}/>
          <legend className="fieldset-legend font-bold">
            Password </legend>
          <input type="text" className="input" value ={password} onChange={ (e)=> setPassword(e.target.value)}/>
          <p className='text-red-600 font-semibold m-1'>
            {error}
          </p>
        </fieldset>
        </div>
        <div className="card-actions justify-center my-4">
        <button className="btn btn-neutral" onClick={handlelogin}>
          Login</button>
      </div>
      </div>
  </div>
  </div>
  );
}

export default Login;
