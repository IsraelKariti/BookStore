import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const ImageContainer = ({path})=>{
    console.log(path);
    const onBuyBookClicked = ()=>{
        console.log("but book clicked!");
    }

    return <div className="image-container">
        <img alt="" src={path}/>
        <div className="buy-pop-up" buy-book="הוספה לסל">
            <button className="icon-container" onClick={onBuyBookClicked}  >
                <FontAwesomeIcon icon={faCartShopping} />
            </button>
        </div>

    </div>
}

export default ImageContainer;