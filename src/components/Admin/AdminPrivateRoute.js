import React from "react";
import AdminPage from "./AdminPage";
import AdminSignIn from "./AdminSignIn";
import AdminContextProvider from "./AdminContext";

const AdminPrivateRoute = ()=>{
    const email = localStorage.getItem('email');
    const isAdmin = email === "admin@bookstore.com";

    return  isAdmin ? 
    <AdminContextProvider>
        <AdminPage/> 
    </AdminContextProvider>
            :
            <AdminSignIn/>
}

export default AdminPrivateRoute;