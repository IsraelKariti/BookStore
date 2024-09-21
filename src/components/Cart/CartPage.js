import React,{useEffect, useState, useCallback} from 'react';
import Axios from 'axios';
import '../../styles/cart-page.scss';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import AppBar from '../AppBar';

const CartPage = ()=>{
    const [cartItems, setCartItems] = useState([]);
    const [totalCost, setTotalCost] = useState([]);

    const loadItemsFromLocalStorage = async ()=>{
        const cartItemsString = localStorage.getItem('cartItems');
        if(cartItemsString == null || cartItemsString === '')
            setCartItems([]);
        else{
            const cartItemsList = JSON.parse(cartItemsString);
            setCartItems(cartItemsList);
        }
    }
    const loadCartItemsFromDB = async ()=>{
        const token = localStorage.getItem("token");
        const url = process.env.REACT_APP_BACKEND_SERVER + '/verify/user';
        const response = await Axios.get(url, {headers: {
            auth: `Bearer ${token}`
        }});
        if(response.status === 200){
            const url = process.env.REACT_APP_BACKEND_SERVER + '/users';
            const headers = {
                auth: `Bearer ${token}`
            }
            const response = await Axios.get(url, {headers});
            const cartItemsFromDB = response.data.cartItems;
            setCartItems(cartItemsFromDB);
        }
    }

    useEffect(()=>{
        //loadItemsFromLocalStorage();
        loadCartItemsFromDB();
    }, []);

    useEffect(()=>{
        // const total = cartItems.reduce((accu, curr)=>{
        //     return accu += curr.amount * curr.book.printedPrice;
        // }, 0);
        // setTotalCost(total);
        setTotalCost(0);
    },[cartItems]);
    
    return cartItems == null || cartItems.length === 0 ? 
        <div className='empty-cart'>
            <div className="title">הסל ריק</div>
            <Link to="/">חזור לעמוד הבית להמשך קניות</Link>
        </div> :
        <div className="cart-page">
        
        <AppBar title={"הסל שלי"}/>
        <div className="cart-page__calculations">
            <div className="cart-page__items">
                {
                    cartItems.map((item)=><CartItem key={item._id} item={item} reload={loadItemsFromLocalStorage}/>)
                }
            </div>
            <div className="cart-page__summary">
                <div className="cart-page__total">
                    <div className="cart-page__description">סך הכל לתשלום:</div>
                    <div className="cart-page__price">{totalCost.toFixed(2)}</div>
                </div>
                <div className="cart-page__button-container">
                    <div className="cart-page__button">מעבר לתשלום</div>
                </div>
            </div>
        </div>
    </div>
}

export default CartPage;