import React from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../../store/authSlice';
import authService from '../../appwrite/auth';

function LogoutBtn(){
    const dispatch = useDispatch();
    
    const logoutHandler = () =>{
        authService.logout().then(() => {
            dispatch(logout());
        })
    }

    return(
       <button className = "text-white inline-block px-4 py-2 rounded-lg hover:bg-blue-200 m-1" 
       onClick = {logoutHandler}
       >Logout</button> 
    )
}

export default LogoutBtn;