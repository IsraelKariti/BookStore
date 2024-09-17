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
        (async ()=>{
            // load all books from database to the reducer
            const count = await getBooksCount();
            setNumberOfPagesInDB(count);
            const {indexOfStartPage: newStartPageIndex, indexOfEndPage: newEndPageIndex} = calculateAdjacentPages(count, pagesCurrIndex);
             setPagesStartIndex(newStartPageIndex);
            setPagesEndIndex(newEndPageIndex);
            // clear redundant pages
            if(pagesStartIndex > 0 && pagesStartIndex < newStartPageIndex)
            {
                const amountOfPagesToRemove = newStartPageIndex - pagesStartIndex;
                pagesDispatch({type: 'REMOVE_PAGES', numberOfPagesToRemove: amountOfPagesToRemove, removeFromStart: true });
            }
            if(pagesEndIndex > newEndPageIndex){
                const amountOfPagesToRemove = pagesEndIndex - newEndPageIndex;
                pagesDispatch({type: 'REMOVE_PAGES', numberOfPagesToRemove: amountOfPagesToRemove, removeFromStart: false });
            }
            // calculate the range of pages needed
            if(newStartPageIndex < pagesStartIndex){
                const pages = await getBookPagesByRange(newStartPageIndex, pagesStartIndex-1, numberOfBooksInPage);
                pagesDispatch({type: 'ADD_PAGES', position: 'FIRST', pages: pages});
            }
            if(newEndPageIndex > pagesEndIndex){
                const pages = await getBookPagesByRange(pagesEndIndex+1, newEndPageIndex, numberOfBooksInPage);
                pagesDispatch({type: 'ADD_PAGES', position: 'LAST', pages: pages});
            }
        })();
    },[pagesCurrIndex, pagesStartIndex, pagesEndIndex]);

    return <BookStoreContext.Provider value={values}>
        {children}
    </BookStoreContext.Provider>
}

export default BookStoreContextProvider;