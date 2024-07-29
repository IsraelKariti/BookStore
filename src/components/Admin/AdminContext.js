import React, {createContext, useState} from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({children})=>{
    const [isEditBook, setEditBook] = useState(false);
    const [book, setBook] = useState(false);
    const [isAddBook, setAddBook] = useState(false);
    return <AdminContext.Provider value={{isEditBook,setEditBook,book,setBook, isAddBook, setAddBook}}>
        {children}
    </AdminContext.Provider>
}

export default AdminContextProvider;