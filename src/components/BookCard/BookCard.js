import React, {useState,useEffect} from "react";
import ImageContainer from "./ImageContainer";
import Prices from "./Prices";
import '../../styles/book-card.scss';
import AdminImageContainer from "../Admin/AdminImageContainer";
import { useLocation } from 'react-router-dom';

const BookCard = ({book})=>{
  const [isAdmin, setAdmin] = useState(false);
  const location = useLocation();

  const prices = {
    prevPrintedPrice: book.prevPrintedPrice,
    printedPrice: book.printedPrice,
    prevDigitalPrice:book.prevDigitalPrice,
    digitalPrice:book.digitalPrice,
  }

  useEffect(()=>{
    //const isAdminActive = localStorage.getItem('email') === 'admin@bookstore.com';
    // console.log(location.pathname);
    const isAdminActive = location.pathname === '/admin';
    setAdmin(isAdminActive);
  },[]);

  return <div className="book-card">
    {isAdmin? <AdminImageContainer book={book}/> :<ImageContainer book={book}/>}
    <div className="book-name">{book.title}</div>
    <div className="book-author">{book.author}</div>
    <Prices prices={prices}/>
  </div>
}

export default BookCard;