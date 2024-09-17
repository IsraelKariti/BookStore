import React, {useContext, useState, useEffect} from 'react';
import BooksPanel from '../BooksPanel';
import { BookStoreContext } from '../../BookStoreContextProvider';
import BookCard from '../BookCard/BookCard';

const HomeBooksPanel = ()=>{
    const {pagesState, pagesStartIndex, pagesCurrIndex} = useContext(BookStoreContext);

        let books = [];
        if(pagesState.length > 0){
            const pageLocalIndex = pagesCurrIndex - pagesStartIndex;
            const page = pagesState[pageLocalIndex];
            books = page.map((book)=><BookCard key={book._id} book={book}/>);
        }

    return <BooksPanel>
                {
                    books.length === 0 ? <div>Loading books in progress</div> : books
                }
            </BooksPanel>
}

export default HomeBooksPanel;