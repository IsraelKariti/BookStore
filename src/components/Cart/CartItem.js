import React, { useState, useEffect } from "react";
import Axios from 'axios';
import '../../styles/cartItem.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import {removeBookFromActiveUserInDB, increaseBookAmountInActiveUserInDB, decreaseBookAmountInActiveUserInDB} from '../../db/db';
import {removeBookFromActiveUserInLocalStorage, increaseBookAmountInLocalStorage, decreaseBookAmountInLocalStorage} from '../../localStorage/localStorage';

const CartItem = ({item, reload})=>{
    const [book, setBook] = useState(null);
    const bookId = item.bookId;
    const amount = item.amount;
    
    const onIncreaseClicked = ()=>{
        increaseBookAmountInLocalStorage(item.book);
        increaseBookAmountInActiveUserInDB(item.book);
        reload();
    }
    const onDecreaseClicked = ()=>{
        decreaseBookAmountInLocalStorage(item.book);
        decreaseBookAmountInActiveUserInDB(item.book);
        reload();
    }

    const onRemoveClicked = async ()=>{
        removeBookFromActiveUserInLocalStorage(item.book);
        removeBookFromActiveUserInDB(item.book);
        reload();
    }

    useEffect(()=>{
        (async ()=>{
            const url = process.env.REACT_APP_BACKEND_SERVER + `/books/book/${bookId}`;
            const response = await Axios.get(url);
            const book = response.data;
            console.log(book);
            setBook(book);
        })();
    },[]);
    

    return book == null ? 
    <div>loading book...</div> :
     <div className="cart-item">
        <div className="cart-item__remove-container">
            <div className="cart-item__icon-wrapper" >
                <DeleteIcon className="cart-item__remove-icon" onClick={onRemoveClicked}/>
            </div>
        </div>
        <div className="cart-item__content">
            <img src={book.imgPath} alt="" />
            <div className="cart-item__money">
                <div className="cart-item__prev-price">{book.prevPrintedPrice}</div>
                <div className="cart-item__curr-price">{book.printedPrice}</div>
                <div className="cart-item__change-amount">
                    <div className="cart-item__increase" onClick={onIncreaseClicked}>+</div>
                    <div className="cart-item__amount">{item.amount}</div>
                    <div className="cart-item__decrease"  onClick={onDecreaseClicked}>-</div>
                </div>
            </div>
            <div className="cart-item__info">
                <div className="cart-item__title">{book.title}</div>
                <div className="cart-item__author">{book.author}</div>
            </div>
        </div>
    </div>
}

export default CartItem;