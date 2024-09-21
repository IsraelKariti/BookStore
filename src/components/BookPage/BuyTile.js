import React from "react";
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { increaseBookAmountInLocalStorage } from "../../localStorage/localStorage";
import { increaseBookAmountInActiveUserInDB } from "../../db/db";

const BuyTile = ({book, isPrintedBook})=>{

    const buttonStyle = {
        borderRadius: "20px",
    }
    const onBuyClicked = ()=>{
        increaseBookAmountInLocalStorage(book);
        increaseBookAmountInActiveUserInDB(book);
    }
    return <div className="buy-tile">
        {!isPrintedBook && <div className="buy-tile__digital">{"ספר דיגיטלי"}</div>}
        { isPrintedBook && <div className="buy-tile__printed">{"ספר מודפס"}</div>}
        <div className="prev-price">{isPrintedBook ? book.prevPrintedPrice : book.prevDigitalPrice}</div>
        <div className="curr-price">{isPrintedBook ? book.printedPrice : book.digitalPrice}</div>
        
        <Button sx={buttonStyle} variant="contained" startIcon={<ShoppingCartIcon />} onClick={onBuyClicked}>
        הוספה לסל
      </Button>
    </div>
}

export default BuyTile;