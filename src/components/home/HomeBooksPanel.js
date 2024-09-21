import React, {useContext, useState, useEffect} from 'react';
import BooksPanel from '../BooksPanel';
import { BookStoreContext } from '../../BookStoreContextProvider';
import BookCard from '../BookCard/BookCard';

const HomeBooksPanel = ()=>{
    const {pagesState, pagesStartIndex, pagesCurrIndex, searchTerm} = useContext(BookStoreContext);

    let books = [];
    if(pagesState.length > 0){
        const pageLocalIndex = pagesCurrIndex - pagesStartIndex;
        const page = pagesState[pageLocalIndex];
        books = page.map((book)=><BookCard key={book._id} book={book}/>);
    }

    return <BooksPanel>
                {
                    books.length !== 0 ? books : searchTerm !== '' ? <div>No results found</div> : <div>Loading books in progress</div> 
                }
            </BooksPanel>
}

export default HomeBooksPanel;