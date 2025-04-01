import React, { useEffect } from 'react';  
import { BASE_URL } from '../utils/constant';  
import axios from 'axios';  
import { useDispatch, useSelector } from 'react-redux';  
import { addConnections } from '../utils/connectionSlice';  

const Connections = () => {  
    const connections = useSelector((store) => store.connections);  
    const dispatch = useDispatch();  

    const fetchConnection = async () => {  
        try {  
            const res = await axios.get(BASE_URL + '/user/connections', { withCredentials: true });  
            console.log(res);
            dispatch(addConnections(res?.data?.data));  
        } catch (err) {  
            console.log(err.message);  
        }  
    };  

    useEffect(() => {  
        fetchConnection();  
    }, []);  

    if (!connections) return null;  
    if (connections.length === 0) return <h1>No Connections Found..</h1>;  

    return (  
        <div className="text-center my-10 font-serif">  
            <h1 className="text-bold text-pink-700 text-2xl">Connections</h1>  
            {connections.map((connection) => {  
                const { _id, firstName, lastName, about } = connection;  
                return (  
                    <div  
                        key={_id}  
                        className="flex m-4 p-4 rounded-lg bg-purple-100 outline-2 outline-purple-400 w-1/3 mx-auto" >  
                        <div>  
                            <img  
                                alt="photo"  
                                className="w-20 h-20 rounded-box object-cover"  
                                src="https://www.profilebakery.com/wp-content/uploads/2023/04/AI-Profile-Picture.jpg"  
                            />  
                        </div>  
                        <div className="text-left mx-4">  
                            <h2 className="font-bold text-xl">  
                                {firstName + " " + lastName}  
                            </h2>  
                            {/* {age && gender && <p>{age + ", " + gender}</p>}   */}
                            <p>{about}</p> 
                        </div>  
                    </div>  
                );  
            })}  
        </div>  
    );  
};  

export default Connections; 