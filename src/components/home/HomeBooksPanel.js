import React, {useContext, useState} from 'react';
import BooksPanel from '../BooksPanel';
import { BookStoreContext } from '../../BookStoreContextProvider';
import BookCard from '../BookCard/BookCard';

const HomeBooksPanel = ()=>{
    const {pagesState} = useContext(BookStoreContext);
    if(pagesState.length > 0){
        const midPage = pagesState[0];
        const pageBooks = midPage.map((book)=><BookCard key={book._id} book={book}/>);
        return <BooksPanel>
                    {
                        pageBooks
                    }
                </BooksPanel>
    }
    else{
        return <BooksPanel>
                    {
                        <div>Loading books in progress</div>
                    }
                </BooksPanel>
    }
}

export default HomeBooksPanel;