import React, {useContext} from "react";
import {BookStoreContext} from "../../BookStoreContextProvider";
import { Book } from "@mui/icons-material";

const Prices = ({price})=>{
    const {discount, loggedInEmail} = useContext(BookStoreContext);
    const discountFraction = (100-discount)/100;
    const digitalPrice = price/2;
    return <div className="prices">
        <div className="digital-pane">
            <div className="title">{"דיגיטלי"}</div>
            {discount!==0 && <div className="prev-price">{digitalPrice.toFixed(2)}</div>}
            {discount!==0 && <div className="price">{(digitalPrice*discountFraction).toFixed(2)}</div>}
            
            {discount===0 && <div className="price">{digitalPrice.toFixed(2)}</div>}
        </div>
        <div className="printed-pane">
            <div className="title">{"מודפס"}</div>
            {discount!==0 && <div className="prev-price">{price.toFixed(2)}</div>}
            {discount!==0 && <div className="price">{(price*discountFraction).toFixed(2)}</div>}
            
            {discount===0 && <div className="price">{price.toFixed(2)}</div>}
        </div>
    </div>
}

export default Prices;