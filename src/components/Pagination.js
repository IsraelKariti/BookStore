import React , {useState, useContext, useEffect} from "react";
import '../styles/pagination.scss';
import { BookStoreContext } from "../BookStoreContextProvider";

const Pagination = ({numBooks, numColumns, changePage})=>{
    const [activePage, setActivePage] = useState(0);
    const numBooksInPage = numColumns*2;
    const numButtons = Math.ceil(numBooks/numBooksInPage)
    const {searchTerm} = useContext(BookStoreContext);

    const onButtonClicked = (i)=>{
        setActivePage(i);
        changePage(i);
    }

    const buttons = Array(numButtons).fill(0).map((_,i)=>{
        return <button key={i} className={activePage === i ? 'active-button' : ''} onClick={()=>onButtonClicked(i)}>{i+1}</button>
    })
    useEffect(()=>{
        setActivePage(0);
    },[searchTerm, numColumns]);

    return <div className="pagination">
        {
            buttons
        }
    </div>
}

export default Pagination;