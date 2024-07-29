import React, {createContext, useReducer, useState} from "react";
import { booksInitialState, booksReducer } from "./reducers/booksReducer";
import { usersInitialState, usersReducer } from "./reducers/usersReducer";


export const BookStoreContext = createContext();

const BookStoreContextProvider = ({children})=>{
    const [booksState, booksDispatch] = useReducer(booksReducer, booksInitialState);
    const [usersState, usersDispatch] = useReducer(usersReducer, usersInitialState);
    const [searchTerm, setSearchTerm] = useState('');
    const [loggedInIdToken, setLoggedInIdToken] = useState(null);
    const [loggedInEmail, setLoggedInEmail] = useState(null);
    const [discount, setDiscount] = useState(0);    
    const [isThankyouModal, setThankyouModal] = useState(false);
 
    const values = {
        booksState,
        booksDispatch,
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
    }

    return <BookStoreContext.Provider value={values}>
        {children}
    </BookStoreContext.Provider>
}

export default BookStoreContextProvider;