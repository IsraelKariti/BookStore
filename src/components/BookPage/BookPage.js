import React, {useContext} from "react";
import '../../styles/book-page.scss';
import { useParams } from "react-router-dom";
import { BookStoreContext } from "../../BookStoreContextProvider";
import BookPagePrices from "./BookPagePrices";
import Summary from "./Summary";
import AppBar from "../AppBar";

const BookPage = ()=>{
    const {booksState} = useContext(BookStoreContext);
    const {id} = useParams();
    console.log(booksState[id]);
    return <div className="book-page">
        <AppBar title={"פרטי הספר"}/>
        <img src={booksState[id].imgPath} alt=""/>
        <div className="book-page__textual">
            <div className="title">{booksState[id].title}</div>
            <div className="author">{booksState[id].author}</div>
            <Summary summary={booksState[id].summary}/>
            <BookPagePrices book={booksState[id]}/>
        </div>
    </div>
}

export default BookPage;