import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constant';

const Login = () => {

  const [emailId,setEmailId] = useState ("");
  const [password,setPassword] = useState ("");
  const [firstName,setFirstName] = useState ("");
  const [lastName,setLastName] = useState ("");
  const [isLoginForm,setIsLoginForm] = useState(false);
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
    return navigate("/");

  }
  catch(err){
    setError(err?.response?.data || "Somethng went wrong");
  }
  }

  const handleSignUp = async () =>{
    try{
      const res = await axios.post(BASE_URL + "/signup", {firstName,lastName,emailId,password},
        {withCredentials: true}
      );
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
}
    catch(err){
      console.log(err);
    }
  }
    
  return (
    <div>
    <div className='flex justify-center my-8 font-serif'>
    <div className="card card-border outline-2 outline-purple-300 bg-purple-100 w-96">
    <div className="card-body">
      <h2 className="card-title justify-center text-xl text-pink-600">{isLoginForm ? "Login" : "Sign Up"}</h2>
        <div>
          {!isLoginForm && (
            <>
            <fieldset className="fieldset">
            <legend className="fieldset-legend font-bold" >
              First Name  </legend>
            <input type="text" className="input" value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>
            <legend className="fieldset-legend font-bold" >
              Last Name </legend>
            <input type="text" className="input" value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
            </fieldset>
          </>
          )}
          <fieldset className="fieldset">
          <legend className="fieldset-legend font-bold" >
            Email ID </legend>
          <input type="text" className="input" value={emailId} onChange={(e)=> setEmailId(e.target.value)}/>
          <legend className="fieldset-legend font-bold">
            Password </legend>
          <input type="password" className="input" value ={password} onChange={ (e)=> setPassword(e.target.value)}/>
          
          <p className='text-red-600 font-semibold m-1'>
            {error}
          </p>
        </fieldset>
        </div>
        <div className="card-actions justify-center">
        <button className="btn btn-outline btn-neutral" onClick={isLoginForm ? handlelogin : handleSignUp}>
          {isLoginForm ? "Login" : "SignUp"}</button>
      </div>
        <p className='font-medium m-auto cursor-pointer my-1 underline' onClick={() => setIsLoginForm((value)=> !value)}>
          {isLoginForm ? "Don't have an account? SignUp" : "Already have an account? Login" }</p>
      </div>
  </div>
  </div>
  </div>
  );
}

export default Login;
