import React, {useContext} from "react";
import {BookStoreContext} from "../../BookStoreContextProvider";

const Prices = ({prices})=>{
    let discount = localStorage.getItem('discount');
    discount = discount != null ? discount: 0;
    const discountFraction = (100-discount)/100;
    const isSignedIn = localStorage.getItem('email') != null;

    return <div className="prices">
        <div className="digital-pane">
            <div className="title">{"דיגיטלי"}</div>
            <div className="prev-price">{prices.prevDigitalPrice}</div>
            <div className="price">{prices.digitalPrice}</div>
        </div>
        <div className="printed-pane">
            <div className="title">{"מודפס"}</div>
            <div className="prev-price">{(prices.prevPrintedPrice*(isSignedIn?discountFraction:1)).toFixed(2)}</div>
            <div className="price">{(prices.printedPrice*(isSignedIn?discountFraction:1)).toFixed(2)}</div>
        </div>
    </div>
}

export default Prices;