import React, {useContext, useState} from 'react';
import BooksPanel from '../BooksPanel';
import { BookStoreContext } from '../../BookStoreContextProvider';
import BookCard from '../BookCard/BookCard';

const HomeBooksPanel = ()=>{
    const {booksState} = useContext(BookStoreContext);
    return <BooksPanel >
        {
            booksState.map((book)=><BookCard key={book.id} book={book}/>)
        }
    </BooksPanel>
}

export default HomeBooksPanel;