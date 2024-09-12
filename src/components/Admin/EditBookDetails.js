import React, {useEffect, useState, useContext} from 'react';
import '../../styles/editBookDetails.scss';
import {BookStoreContext} from '../../BookStoreContextProvider';
import { AdminContext } from "./AdminContext";
import { nanoid } from 'nanoid';
import { addBookToDB } from '../../db/db';

const EditBookDetails = ({showSnackBar})=>{
    const {booksDispatch} = useContext(BookStoreContext);
    const {setEditBook,book,setBook, isAddBook, setAddBook} = useContext(AdminContext);

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [imgPath, setImgPath] = useState('');
    const [summary, setSummary] = useState('');
    const [price, setPrice] = useState(79.9);

    const onTitleChanged = (e)=>{
        setTitle(e.target.value);
    }
    const onAuthorChanged = (e)=>{
        setAuthor(e.target.value);
    }
    const onRatingChanged = (e)=>{
        setRating(e.target.value);
    }
    const onReviewChanged = (e)=>{
        setReview(e.target.value);
    }
    const onLinkChagned = (e)=>{
        setReview(e.target.value);
    }
    const onSummaryChanged = (e)=>{
        setSummary(e.target.value);
    }
    const onCancelClicked = (e)=>{
        e.preventDefault();
        setEditBook(false);
        setAddBook(false);
        setBook(null);
    }

    const submitEditedBook = ()=>{
        booksDispatch({
            type: 'EDIT',
            id: book.id,
            book:{...book, title,author, rating, review, imgPath, summary},
        });
    }

    const submitNewBook = async ()=>{
        const response = await addBookToDB({
            title,
            author, 
            price,
            imgPath, 
            summary,
            review, 
            rating, 
        });
        if(response.status === 201)
            showSnackBar('Book was successfully added');
        else
            showSnackBar('Error: Could not add book');
    }

    const onFormSubmit = async (e)=>{
        console.log("sumbissoin");
        e.preventDefault();
        isAddBook ?
        await submitNewBook() :
        submitEditedBook();

        setEditBook(false);
        setAddBook(false);
        setBook(null);
    }

    useEffect(()=>{
        if(book != null){
            setTitle(book.title);
            setAuthor(book.author);
            setRating(book.rating);
            setReview(book.review);
            setSummary(book.summary);
            setImgPath(book.imgPath);
        }
    },[]);
    return <div className="edit-book-details">

        <form onSubmit={onFormSubmit}>
            <div className="form-title">
                {isAddBook? 'Create new book' : 'Edit book details'}
            </div>
            <div className="fields">
                <div className="short-fields">
                    <div className="title-container">
                        <div className="title-label">title</div>
                        <input type="text" className="title" value={title} onChange={onTitleChanged}/>
                    </div>
                    <div className="author-container">
                        <div className="author-label">author</div>
                        <input type="text" className="author"  value={author} onChange={onAuthorChanged}/>
                    </div>
                    
                    <div className="rating-container">
                        <div className="rating-label">rating</div>
                        <input type="number" min="1" max="5" className="rating" value={rating} onChange={onRatingChanged} />
                    </div>
                    
                    <div className="link-container">
                        <div className="link-label">link</div>
                        <input type="text" className="link"  value={imgPath} onChange={onLinkChagned}/>
                    </div>
                </div>
                <div className="long-fields">
                    <div className="summary-container">
                        <div className="summary-label">summary</div>
                        <textarea type="text" className="summary"  value={summary} onChange={onSummaryChanged}/>
                    </div>
                    <div className="text-review-container">
                        <div className="text-review-label">review</div>
                        <textarea type="text" className="text-review"  value={review} onChange={onReviewChanged}/>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <button className="cancel-button" onClick={onCancelClicked}>CANCEL</button>
                <button className="submit-button" type="submit">SUBMIT</button>
            </div>
        </form>
    </div>
}

export default EditBookDetails;