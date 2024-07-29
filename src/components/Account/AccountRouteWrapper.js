import React from 'react';
import AccountPage from './AccountPage';
import { Navigate } from 'react-router-dom';

const AccountRouteWraper = ()=>{
    const sessionEmail = localStorage.getItem('email');
    return sessionEmail != null ? <AccountPage/> : <Navigate to="/signin"/>
}

export default AccountRouteWraper;