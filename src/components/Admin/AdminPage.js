import React, {useEffect, useState, useContext} from "react";
import { getAccount, deleteAccount} from "../../db/db";
import { deleteSignedInAccount } from "../../auth/auth";
import '../../styles/adminPage.scss';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import EditAccountModal from "../Account/EditAccountModal";
import HomeBooksPanel from "../home/HomeBooksPanel";
import EditBookDetails from "./EditBookDetails";
import { AdminContext } from "./AdminContext";
import { BookStoreContext } from "../../BookStoreContextProvider";
import BooksPanelContextProvider from "../BooksPanelContextProvider";
const AdminPage = ()=>{
    const {isEditBook,setEditBook,book, isAddBook, setAddBook, } = useContext(AdminContext);
    const {discount, setDiscount} = useContext(BookStoreContext); 
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
        localStorage.removeItem('email');
        localStorage.removeItem('idToken');
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
        const sessionEmail = localStorage.getItem('email');
        const account = await getAccount(sessionEmail);
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

    const addBook = (e)=>{
        setAddBook(true);
    }
    const onDiscountChanged = (e)=>{
        setDiscount(e.target.value);
        localStorage.setItem('discount', e.target.value);
    }
    useEffect(()=>{
        setPageData();
        const discountValue = localStorage.getItem('discount');
        setDiscount(discountValue);
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
                    </div>
                    <BooksPanelContextProvider>
                        <HomeBooksPanel/>
                    </BooksPanelContextProvider>
                    <div className="add-book-container">
                        <button className="add-book" onClick={addBook}>Add Book</button>
                    </div>
                    <div className="discount-container">
                        <div className="discount-label">Create discount</div>
                        <input type="number" min="0" max="100" className="discount" value={discount} onChange={onDiscountChanged} />
                    </div>
                    {isEditing && <EditAccountModal closeEditModal={closeEditModal} isAdmin={true}/>}
                    {(isEditBook || isAddBook) && <EditBookDetails/>}
                </div>
}      
export default AdminPage;