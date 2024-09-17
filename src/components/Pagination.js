import React , {useState, useContext, useEffect} from "react";
import '../styles/pagination.scss';
import { BookStoreContext } from "../BookStoreContextProvider";
import {calculateAdjacentPages} from "../utils/bookPageCalculations.js";

const Pagination = ({numBooks, numColumns, changePage})=>{
    
    const {searchTerm, pagesCurrIndex, setPagesCurrIndex, numberOfPagesInDB, pagesStartIndex, pagesEndIndex} = useContext(BookStoreContext);

    const onButtonClicked = (pageNumber)=>{
        setPagesCurrIndex(pageNumber);
    }
    
        const numberOfButtons = pagesEndIndex - pagesStartIndex + 1;
        const pagesButtons = Array(numberOfButtons).fill(0).map((_,i)=>{
            return <button key={i} className={pagesCurrIndex === pagesStartIndex+i ? 'active-button' : ''} onClick={()=>onButtonClicked(pagesStartIndex+i)}>{pagesStartIndex+i}</button>
        });

    return <div className="pagination">
        {
            pagesButtons
        }
    </div>
}

export default Pagination;