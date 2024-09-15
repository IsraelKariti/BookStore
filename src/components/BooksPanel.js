import React, {useEffect, useState, useContext} from "react";
import '../styles/books-panel.scss';
import Pagination from "./Pagination";
import { BookStoreContext } from "../BookStoreContextProvider";
import ThankyouModal from './ThankyouModal';

const BooksPanel = ({children})=>{
    const {isThankyouModal} = useContext(BookStoreContext);
    const numBooks = children.length;
    const [numColumns, setNumColumns] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const {searchTerm} = useContext(BookStoreContext);
    const NUM_BOOKS_PER_PAGE = 12;

    // let isColumnWise = false;
    const changePage = (pageIndex)=>{
        setStartIndex(pageIndex*NUM_BOOKS_PER_PAGE);
    }

    const updateNumOfColumns = ()=>{
        const innerWidth = window.innerWidth;
        if(innerWidth < 500){
            setNumColumns(2);
        }
        else if(innerWidth < 650){
            setNumColumns(3);
        }
        else if(innerWidth < 900){
            setNumColumns(4);
        }
        else{
            setNumColumns(6);
        }
    }
     
    useEffect(()=>{
        setStartIndex(0);
    },[searchTerm, numColumns]);

    useEffect(()=>{
        window.addEventListener('resize', updateNumOfColumns);
        updateNumOfColumns();
    },[])

    return <div className="books-panel">
            <div className="books-panel__grid-column-wise">
                {children}
            </div>
            <Pagination numBooks={numBooks} numColumns={numColumns} changePage={changePage} />
            {isThankyouModal && <ThankyouModal/>}
    </div>
}

export default BooksPanel;