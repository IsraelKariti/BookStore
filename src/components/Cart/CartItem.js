import React from "react";
import '../../styles/cartItem.scss';
import DeleteIcon from '@mui/icons-material/Delete';
import {removeBookFromActiveUserInDB, increaseBookAmountInActiveUserInDB, decreaseBookAmountInActiveUserInDB} from '../../db/db';
import {removeBookFromActiveUserInLocalStorage, increaseBookAmount, decreaseBookAmount} from '../../localStorage/localStorage';

const CartItem = ({item, reload})=>{
    const book = item.book;
    const onIncreaseClicked = ()=>{
        increaseBookAmount(item.book);
        increaseBookAmountInActiveUserInDB(item.book);
        reload();
    }
    const onDecreaseClicked = ()=>{
        decreaseBookAmount(item.book);
        decreaseBookAmountInActiveUserInDB(item.book);
        reload();
    }

    const onRemoveClicked = async ()=>{
        removeBookFromActiveUserInLocalStorage(item.book);
        removeBookFromActiveUserInDB(item.book);
        reload();
    }
    
    return <div className="cart-item">
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