import React from "react";
import '../../styles/book-page-prices.scss';
import BuyTile from "./BuyTile";

const BookPagePrices = ({book})=>{
    return <div className="book-page-prices">
        <BuyTile book={book} isPrintedBook={false}/>
        <BuyTile book={book} isPrintedBook={true}/>
    </div>
}

export default BookPagePrices;