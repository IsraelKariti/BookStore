import React , {useContext, useEffect, useState} from "react";
import '../../styles/search.scss';
import SearchPageBar from "./SearchPageBar";
import { BookStoreContext } from "../../BookStoreContextProvider";
import BookCard from "../BookCard/BookCard";
import SearchBooksPanel from "../searchPage/SearchBooksPanel";

import BooksPanelContextProvider from "../BooksPanelContextProvider";
const Search = ()=>{
    const {searchTerm} = useContext(BookStoreContext);

    return <div className="search">
        <SearchPageBar/>
        { searchTerm!== '' && <div className="title">תוצאות חיפוש עבור: {searchTerm}</div>}
        <BooksPanelContextProvider>
                <SearchBooksPanel/>
        </BooksPanelContextProvider>
    </div>
}

export default Search;