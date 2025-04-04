import React, { useEffect } from 'react';
import NavBar from './Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Body = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserData = useSelector((store)=>store.user);

  const fetchUser = async () =>{

    if(UserData) return;
    try{
      const res = await axios.get(BASE_URL+"/profile/view", 
      {withCredentials:true,});
      dispatch(addUser(res));
       }
    catch(err){

      if(err.status ===401){
        navigate("/login");
      }
      console.log(err);
  }
}

  useEffect(()=>{
    fetchUser();
  },[]);

  return (
    <div className=" bg-[url('https://wallpapers.com/images/hd/purple-gradient-background-1920-x-1080-86tsa4sck3yzul4g.jpg')] bg-cover bg-center bg-opacity-50 h-screen">
      <NavBar/>
      <Outlet/>
      <Footer />
    </div>
  );
}

export default Body;
