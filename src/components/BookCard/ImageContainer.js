import React, {useContext} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import {increaseBookAmountInActiveUserInDB} from '../../db/db';
import {addBookToActiveUserInLocalStorage, increaseBookAmount} from '../../localStorage/localStorage';
import { useNavigate } from "react-router-dom";
import {BookStoreContext} from '../../BookStoreContextProvider';

const ImageContainer = ({book})=>{
    const {setThankyouModal} = useContext(BookStoreContext);
    const navigate = useNavigate();

    const viewBookDetails = ()=>{
        navigate(`/books/${book.id}`);    
    }
    const onBuyBookClicked = (e)=>{
        e.stopPropagation();
        const sessionEmail = localStorage.getItem('email');
        // if no user is logged in
        if(sessionEmail == null || sessionEmail === ''){
            increaseBookAmount(book);
        }
        // if user is logged in
        else{
            // store the book in the cart-items of the specific user
            addBookToActiveUserInLocalStorage(book)
            increaseBookAmountInActiveUserInDB(book);
        }
        // alert('book added to your cart!');
        setThankyouModal(true);
    }

    return <div className="image-container" onClick={viewBookDetails}>
        <img alt="" src={book.imgPath}/>
        <div className="buy-pop-up" buy-book="הוספה לסל">
            <button className="icon-container" onClick={onBuyBookClicked}  >
                <FontAwesomeIcon icon={faCartShopping} />
            </button>
        </div>

    </div>
}

export default ImageContainer;