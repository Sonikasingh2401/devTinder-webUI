import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import Connections from "./Connections";

const NavBar = ()=>{

    const user = useSelector((store)=>store.user);
    console.log(user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async ()=>{

        try{
            await axios.post(BASE_URL+ "/logout" , {withCredentials:true,});
            dispatch(removeUser())
            return navigate("/login");
        }
        catch(err){
            res.status(400).send("Error in loging out..")
        }
    }
    return (
    <div>
        <div className="navbar bg-pink-200 shadow-sm font-serif">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-2xl  text-pink-700"> DevTinder</Link>
        </div>
        {user && <div className="flex gap-2">
            <div className="form-control my-2 text-pink-800">Welcome, {user.firstName}</div>
            <div className="dropdown dropdown-end mx-8">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
            <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
        </div>
        <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
            <Link to={"/profile"} className="justify-between">
                Profile
            </Link>
            </li>
            <li><Link to={"/connections"}>Connections</Link></li>
            <li><a onClick={handleLogout}>Logout</a></li>
        </ul>
        </div>
        </div>
        }
        </div>
    </div>
    );
};

export default NavBar;