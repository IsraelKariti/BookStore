import React,{createContext, useState} from "react";

export const BooksPanelContext = createContext();

const BooksPanelContextProvider = ({children})=>{

    return <BooksPanelContext.Provider >
        {children}
    </BooksPanelContext.Provider>
}

export default BooksPanelContextProvider;