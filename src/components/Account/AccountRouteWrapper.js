import React from 'react';
import AccountPage from './AccountPage';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AccountRouteWraper = ()=>{
    const token = localStorage.getItem('token');
    if(token != null){
        const decoded = jwtDecode(token);
        if(decoded != null){
            return <AccountPage/>;
        }
        else{
            return <Navigate to="/signin"/>; 
        }
    }
    else{
        return <Navigate to="/signin"/>;
    }
}

export default AccountRouteWraper;