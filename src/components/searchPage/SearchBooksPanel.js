import React, {useContext, useEffect, useState} from 'react';
import BooksPanel from '../BooksPanel';
import { BookStoreContext } from '../../BookStoreContextProvider';
import BookCard from '../BookCard/BookCard';

const SearchBooksPanel = ()=>{
    const {searchTerm, booksState} = useContext(BookStoreContext);
    const [foundBooks, setFoundBooks] = useState([]);

    useEffect(()=>{
        const filteredBooks = booksState.filter(book=>book.title.includes(searchTerm))
        setFoundBooks(filteredBooks);
    },[searchTerm, booksState]);

    return <BooksPanel >
        {
            foundBooks.map((book)=><BookCard key={book.id} book={book}/>)
        }
    </BooksPanel>
}

export default SearchBooksPanel;