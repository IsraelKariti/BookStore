import React, {useEffect, useState} from "react";
import { getAccount, deleteAccount} from "../../db/db";
import { deleteSignedInAccount } from "../../auth/auth";
import '../../styles/accountPage.scss';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import EditAccountModal from "./EditAccountModal";
import { jwtDecode } from "jwt-decode";

const AccountPage = ()=>{
    const [id, setId] = useState('');
    const [signUpDate, setSignUpDate] = useState('');
    const [lastSignIn, setLastSignIn] = useState('');
    const [datum, setDatum] = useState([]);
    const [isEditing, setEditing] = useState(false);
    const navigate = useNavigate();

    const homeStyle = {
        cursor: "grab",
        '&:hover':{
            color: "grey",
            border: "1px solid black",
            borderRadius: "10px",
        }
    }

    const onHomeClicked = (e)=>{
        navigate("/home");
    }
    const onSignOutClicked = (e)=>{
        localStorage.removeItem('token');
        navigate("/home");
    }
    const onDeleteClicked = async (e)=>{
        await deleteSignedInAccount();
        localStorage.removeItem('token');
        navigate("/home");
    }
    const onEditClicked = async (e)=>{
        setEditing(true);
    }
    const closeEditModal = ()=>{
        setEditing(false);
        setPageData();
    }
    const setPageData = async ()=>{
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const email = decoded.email;
        const account = await getAccount(email);
        //TODO: Check if the data can just go inside the STATE
        setId(account.id);
        setSignUpDate(account.signUpDate);
        setLastSignIn(account.lastSignIn);
        setDatum([]);
        setDatum(datum=>[...datum, {label:'First name:', data: account.firstName}]);
        setDatum(datum=>[...datum, {label:'Last name:', data: account.lastName}]);
        setDatum(datum=>[...datum, {label:'Phone:', data: account.phone}]);
        setDatum(datum=>[...datum, {label:'Email:', data: account.email}]);
        setDatum(datum=>[...datum, {label:'Date of birth:', data: account.dob}]);
    }
    useEffect(()=>{
        setPageData();
    },[]);
    return  <div className="account-page">
                <div className="nav-container">
                    <HomeIcon sx={homeStyle} onClick={onHomeClicked}/>
                    <div className="sign-out-button" onClick={onSignOutClicked}>Sign out</div>
                </div>
                <div className="account-page__header">
                    <div className="account-page__title">Account Info</div>
                    <div className="account-page__dates">
                        <div className="account-page__sign-up-date">registered on: {signUpDate}</div>
                        <div className="account-page__last-sign-in">last login: {lastSignIn}</div>
                    </div>
                </div>
                <div className="account-page__info">    
                    {
                        datum.map(item=>(
                            <div key={item.label} className="account-page__data-container">
                                <div className="account-page__label">{item.label}</div>
                                <div className="account-page__data">{item.data}</div>
                            </div>
                        ))
                    }
                </div>
                <div className="buttons-container">
                    <div className="edit-button" onClick={onEditClicked}>Edit</div>
                    <div className="delete-button" onClick={onDeleteClicked}>Delete</div>
                </div>
                {isEditing && <EditAccountModal closeEditModal={closeEditModal}/>}
            </div>
}

export default AccountPage;