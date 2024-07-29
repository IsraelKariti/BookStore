import React, {useEffect, useState, useContext} from "react";
import '../styles/books-panel.scss';
import Pagination from "./Pagination";
import { BookStoreContext } from "../BookStoreContextProvider";
import ThankyouModal from './ThankyouModal';

const BookPanel = ({children})=>{
    const {isThankyouModal} = useContext(BookStoreContext);
    const numBooks = children.length;
    const [numColumns, setNumColumns] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const {searchTerm} = useContext(BookStoreContext);

    let isColumnWise = false;
    const changePage = (pageIndex)=>{
        setStartIndex(pageIndex*numColumns*2);
    }

    const updateNumOfColumns = ()=>{
        const innerWidth = window.innerWidth;
        if(innerWidth < 500){
            setNumColumns(2);
        }
        else if(innerWidth < 650){
            setNumColumns(3);
        }
        else if(innerWidth < 800){
            setNumColumns(4);
        }
        else{
            setNumColumns(5);
        }
    }

    if(numBooks > numColumns*2)
        isColumnWise = true;
    else
        isColumnWise = false;
    
    useEffect(()=>{
        setStartIndex(0);
    },[searchTerm, numColumns]);

    useEffect(()=>{
        window.addEventListener('resize', updateNumOfColumns);
        updateNumOfColumns();
    },[])

    return <div className="books-panel">
            <div className={isColumnWise ? "books-panel__grid-column-wise" : "books-panel__grid-row-wise"}>
                {children.slice(startIndex,startIndex+numColumns*2)}
            </div>
            {isColumnWise && <Pagination numBooks={numBooks} numColumns={numColumns} changePage={changePage} />}
            {isThankyouModal && <ThankyouModal/>}
    </div>
}

export default BookPanel;