import React, {createContext, useReducer} from "react";
import { booksInitialState, booksReducer } from "./reducers/booksReducer";
import { usersInitialState, usersReducer } from "./reducers/usersReducer";


export const BookStoreContext = createContext();

const BookStoreContextProvider = ({children})=>{
    const [booksState, booksDispatch] = useReducer(booksReducer, booksInitialState);
    const [usersState, usersDispatch] = useReducer(usersReducer, usersInitialState);

    const values = {
        booksState,
        booksDispatch,
        usersState,
        usersDispatch,
    }

    return <BookStoreContext.Provider value={values}>
        {children}
    </BookStoreContext.Provider>
}

export default BookStoreContextProvider;