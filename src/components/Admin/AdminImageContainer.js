import React, {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/adminImageContainer.scss';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import {BookStoreContext} from '../../BookStoreContextProvider';
import { AdminContext } from "./AdminContext";

const AdminImageContainer = ({book})=>{
    const navigate = useNavigate();
    const {setEditBook, setBook} = useContext(AdminContext);
    const {booksDispatch} = useContext(BookStoreContext);

    const viewBookDetails = ()=>{
        navigate(`/books/${book.id}`);    
    }
    const onEditClicked = (e)=>{
        console.log('on edit clicked');
        e.stopPropagation();
        setEditBook(true);
        setBook(book);
    }
    const onRemoveClicked = (e)=>{
        e.stopPropagation();
        booksDispatch({type: 'REMOVE', bookId: book.id});
    }

    return <div className="admin-image-container" onClick={viewBookDetails}>
        <img alt="" src={book.imgPath}/>
        <div className="remove-pop-up" remove-book="הסרה">
            <button className="icon-container" onClick={onRemoveClicked}  >
                <DeleteForeverIcon/>
            </button>
        </div>
        <div className="edit-pop-up" edit-book="עריכה">
            <button className="icon-container" onClick={onEditClicked}  >
                <EditIcon/>
            </button>
        </div>
        
    </div>
}

export default AdminImageContainer;