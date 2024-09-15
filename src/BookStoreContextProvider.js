import React, {createContext, useEffect, useReducer, useState} from "react";
import { pagesInitialState, pagesReducer } from "./reducers/booksReducer";
import { usersInitialState, usersReducer } from "./reducers/usersReducer";
import { getBookPagesByRange } from "./services/books.service";

export const BookStoreContext = createContext();

const BookStoreContextProvider = ({children})=>{
    const [pagesState, pagesDispatch] = useReducer(pagesReducer, pagesInitialState);
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
            const pages = await getBookPagesByRange(1,3,12);
            pagesDispatch({type: 'ADD_PAGES', pages: pages});
        })();
    },[]);

    return <BookStoreContext.Provider value={values}>
        {children}
    </BookStoreContext.Provider>
}

export default BookStoreContextProvider;