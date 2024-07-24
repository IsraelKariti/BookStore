import React from "react";

const Prices = ({prices})=>{
    return <div className="prices">
        <div className="digital-pane">
            <div className="title">{"דיגיטלי"}</div>
            <div className="prev-price">{prices.prevDigitalPrice}</div>
            <div className="price">{prices.digitalPrice}</div>
        </div>
        <div className="printed-pane">
            <div className="title">{"מודפס"}</div>
            <div className="prev-price">{prices.prevPrintedPrice}</div>
            <div className="price">{prices.printedPrice}</div>
        </div>
    </div>
}

export default Prices;