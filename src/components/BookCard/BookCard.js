import React from "react";
import ImageContainer from "./ImageContainer";
import Prices from "./Prices";
import '../../styles/book-card.scss';

const BookCard = ({book})=>{
  const prices = {
    prevPrintedPrice: book.prevPrintedPrice,
    printedPrice: book.printedPrice,
    prevDigitalPrice:book.prevDigitalPrice,
    digitalPrice:book.digitalPrice,
  }
  return <div className="book-card">
    <ImageContainer path={book.imgPath}/>
    <div className="book-name">{book.name}</div>
    <div className="book-author">{book.author}</div>
    <Prices prices={prices}/>
  </div>
}

export default BookCard;