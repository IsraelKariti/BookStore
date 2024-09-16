import React, {createContext, useEffect, useReducer, useState, useCallback} from "react";
import { pagesInitialState, pagesReducer } from "./reducers/booksReducer";
import { usersInitialState, usersReducer } from "./reducers/usersReducer";
import { getBookPagesByRange, getBooksCount } from "./services/books.service";
import { numberOfBooksInPage, numberOfIdealPagesInPagination } from "./utils/constants";

export const BookStoreContext = createContext();

const BookStoreContextProvider = ({children})=>{
    const [pagesState, pagesDispatch] = useReducer(pagesReducer, pagesInitialState);
    const [numberOfPagesInDB, setNumberOfPagesInDB] = useState(0);
    const [pagesStartIndex, setPagesStartIndex] = useState(0);
    const [pagesEndIndex, setPagesEndIndex] = useState(0);
    const [pagesCurrIndex, setPagesCurrIndex] = useState(0);
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

    const calculateStartToEndPages = useCallback((count, currPageIndex)=>{
        const numberOfPossiblePages = Math.ceil( count / numberOfBooksInPage); 
        const numberOfAdjacentPages = Math.floor(numberOfIdealPagesInPagination/2);

        const possibleIndexOfStartPage = currPageIndex - numberOfAdjacentPages;
        const indexOfStartPage = Math.max(1, possibleIndexOfStartPage);
        const missingStartPages = 2 - (currPageIndex - indexOfStartPage);

        if(missingStartPages > 0){
            const possibleIndexOfEndPage = currPageIndex + numberOfAdjacentPages + missingStartPages;
            const indexOfEndPage = Math.min(numberOfPossiblePages, possibleIndexOfEndPage);
            return {indexOfStartPage, indexOfEndPage};
        }

        const possibleIndexOfEndPage = currPageIndex + numberOfAdjacentPages;
        const indexOfEndPage = Math.min(numberOfPossiblePages, possibleIndexOfEndPage);
        const missingEndPages = 2 - (indexOfEndPage - currPageIndex);

        if(missingEndPages > 0){
            const possibleIndexOfStartPage = currPageIndex - numberOfAdjacentPages - missingEndPages;
            const indexOfStartPage = Math.max(1, possibleIndexOfStartPage);
            return {indexOfStartPage, indexOfEndPage};
        }

        return {indexOfStartPage, indexOfEndPage};
    }, [numberOfBooksInPage, numberOfIdealPagesInPagination])

    useEffect(()=>{
        (async ()=>{
            // load all books from database to the reducer
            const count = await getBooksCount();
            setNumberOfPagesInDB(count);
            const {indexOfStartPage: startPageIndex, indexOfEndPage: endPageIndex} = calculateStartToEndPages(count, 1);
            const pages = await getBookPagesByRange(startPageIndex, endPageIndex, numberOfBooksInPage);
            pagesDispatch({type: 'ADD_PAGES', position:'FIRST', pages: pages});
        })();
    },[]);

    return <BookStoreContext.Provider value={values}>
        {children}
    </BookStoreContext.Provider>
}

export default BookStoreContextProvider;