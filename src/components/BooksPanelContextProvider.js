import React,{createContext, useState} from "react";

export const BooksPanelContext = createContext();

const BooksPanelContextProvider = ({children})=>{

    return <BooksPanelContext.Provider value={null}>
        {children}
    </BooksPanelContext.Provider>
}

export default BooksPanelContextProvider;