import React, {createContext, useEffect, useReducer, useState, useCallback} from "react";
import { pagesInitialState, pagesReducer } from "./reducers/booksReducer";
import { usersInitialState, usersReducer } from "./reducers/usersReducer";
import { getBookPagesByRange, getBooksCount } from "./services/books.service";
import { numberOfBooksInPage, numberOfIdealPagesInPagination } from "./utils/constants";
import { calculateAdjacentPages } from "../src/utils/bookPageCalculations.js";

export const BookStoreContext = createContext();

const BookStoreContextProvider = ({children})=>{
    const [pagesState, pagesDispatch] = useReducer(pagesReducer, pagesInitialState);
    const [numberOfPagesInDB, setNumberOfPagesInDB] = useState(0);
    const [pagesStartIndex, setPagesStartIndex] = useState(0);
    const [pagesEndIndex, setPagesEndIndex] = useState(0);
    const [pagesCurrIndex, setPagesCurrIndex] = useState(1);
    const [usersState, usersDispatch] = useReducer(usersReducer, usersInitialState);
    const [searchTerm, setSearchTerm] = useState('');
    const [loggedInIdToken, setLoggedInIdToken] = useState(null);
    const [loggedInEmail, setLoggedInEmail] = useState(null);
    const [discount, setDiscount] = useState(0);
    const [isThankyouModal, setThankyouModal] = useState(false);
    const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);
 
    const values = {
        pagesState,
        pagesDispatch,
        numberOfPagesInDB, 
        setNumberOfPagesInDB,
        pagesStartIndex, 
        setPagesStartIndex,
        pagesEndIndex, 
        setPagesEndIndex,
        pagesCurrIndex, 
        setPagesCurrIndex,
        usersState,
        usersDispatch,
        searchTerm,
        setSearchTerm,
        loggedInIdToken,
        setLoggedInIdToken,
        loggedInEmail,
        setLoggedInEmail,
        discount, 
        setDiscount,
        isThankyouModal, 
        setThankyouModal,
        isAdminLoggedIn, 
        setAdminLoggedIn
    }

    
    useEffect(()=>{
        //setPagesStartIndex(pagesCurrIndex);
        //setPagesEndIndex(pagesCurrIndex);
        (async ()=>{
            const count = await getBooksCount(searchTerm);
            setNumberOfPagesInDB(count);
            const {indexOfStartPage: newStartPageIndex, indexOfEndPage: newEndPageIndex} = calculateAdjacentPages(count, pagesCurrIndex);
            setPagesStartIndex(newStartPageIndex);
            setPagesEndIndex(newEndPageIndex);
            pagesDispatch({type: 'REMOVE_ALL'});
            const pages = await getBookPagesByRange(newStartPageIndex, newEndPageIndex, numberOfBooksInPage, searchTerm);
            pagesDispatch({type: 'ADD_PAGES', position: 'FIRST', pages: pages});
        })();
    },[pagesCurrIndex, setPagesStartIndex, setPagesEndIndex, searchTerm]);

    return <BookStoreContext.Provider value={values}>
        {children}
    </BookStoreContext.Provider>
}

export default BookStoreContextProvider;