import React, {useState, useEffect} from "react";
import Axios from "axios";
import AdminPage from "./AdminPage";
import AdminSignIn from "./AdminSignIn";
import AdminContextProvider from "./AdminContext";
import { useNavigate } from "react-router";

const AdminPrivateRoute = ()=>{
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        (async ()=>{
            const token = localStorage.getItem('token');
            if(token == null){
                setIsAdmin(false);
                navigate('/adminLogin');
                return;
            }
            else{
                const url = process.env.REACT_APP_BACKEND_SERVER + '/verify/user';
                const response = await Axios.get(url, {headers: {
                    auth: `Bearer ${token}`
                }});
                if(response.status === 200){
                    setIsAdmin(true);
                }
                else{
                    setIsAdmin(false);
                    navigate('/adminLogin');
                }
            }
        })();
    },[]);
    return isAdmin ? <AdminContextProvider>
                  <AdminPage/> 
                </AdminContextProvider> 
                :
                <AdminSignIn/>
}

export default AdminPrivateRoute;