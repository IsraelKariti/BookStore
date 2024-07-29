import React , {useContext} from "react";
import '../styles/thankyouModal.scss'
import {BookStoreContext} from '../BookStoreContextProvider';

const ThankyouModal = ()=>{
    const {setThankyouModal} = useContext(BookStoreContext);

    const closeModal = (e)=>{
        e.stopPropagation();
        setThankyouModal(false);
    }
    return <div className="thank-you">
        <div className="thank-you__modal">
            
        <div className="thank-you__title">Congratulations</div>
        <div className="thank-you__info">Your item has been added to your cart</div>
        <div className="thank-you__button" onClick={closeModal}>CLOSE</div>
        </div>
    </div>
}

export default ThankyouModal;