import React , {useState, useContext, useEffect} from "react";
import '../styles/pagination.scss';
import { BookStoreContext } from "../BookStoreContextProvider";

const Pagination = ({numBooks, numColumns, changePage})=>{
    const [activePage, setActivePage] = useState(1);
    //const numBooksInPage = 12;// numColumns*2;
    const numButtons = 3;//Math.ceil(numBooks/numBooksInPage)
    const {searchTerm} = useContext(BookStoreContext);

    const onButtonClicked = (i)=>{
        setActivePage(i);
        changePage(i);
    }

    const buttons = Array(numButtons).fill(0).map((_,i)=>{
        return <button key={i} className={activePage === i ? 'active-button' : ''} onClick={()=>onButtonClicked(i+1)}>{i+1}</button>
    })

    useEffect(()=>{
        setActivePage(1);
    },[searchTerm, numColumns]);

    return <div className="pagination">
        {
            buttons
        }
    </div>
}

export default Pagination;