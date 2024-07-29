import React, {useState, useEffect, useContext } from "react";
import { BookStoreContext } from "../../BookStoreContextProvider";
import BookCard from "../BookCard/BookCard";
import ReactSimplyCarousel from 'react-simply-carousel';
import '../../styles/carousel-wrapper.scss';
import Review from "./Review";

const CarouselWrapper = ()=>{
    const {booksState} = useContext(BookStoreContext);
    const [numFav, setNumFav] = useState(1);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const updateNumFavs = ()=>{
        const width = window.innerWidth;
        if(width < 350){
            setNumFav(1);
        }
        else if(width < 400){
            setNumFav(2);
        }
        else if(width < 690){
            setNumFav(3);
        }
        else if(width < 820){
            setNumFav(4);
        }
        else if(width < 1000){
            setNumFav(5);
        }
        else{
            setNumFav(6);
        }
    }
    useEffect(()=>{
        window.addEventListener("resize", updateNumFavs);
        updateNumFavs();
    },[]);
    
    return (
        <div className="carousel-wrapper">
          <ReactSimplyCarousel
            activeSlideIndex={activeSlideIndex}
            onRequestChange={setActiveSlideIndex}
            itemsToShow={1}
            itemsToScroll={1}
            forwardBtnProps={{
              //here you can also pass className, or any other button element attributes
              style: {
                alignSelf: 'center',
                background: 'black',
                border: 'none',
                borderRadius: '50%',
                color: 'white',
                cursor: 'pointer',
                fontSize: '20px',
                height: 30,
                lineHeight: 1,
                textAlign: 'center',
                width: 30,
              },
              children: <span>{`>`}</span>,
            }}
            backwardBtnProps={{
              //here you can also pass className, or any other button element attributes
              style: {
                alignSelf: 'center',
                background: 'black',
                border: 'none',
                borderRadius: '50%',
                color: 'white',
                cursor: 'pointer',
                fontSize: '20px',
                height: 30,
                lineHeight: 1,
                textAlign: 'center',
                width: 30,
              },
              children: <span>{`<`}</span>,
            }}
            responsiveProps={[
              {
                itemsToShow: numFav,
                itemsToScroll: 1,
                minWidth: 768,
              },
            ]}
            speed={400}
            easing="ease-out"
          >
            {
              booksState.filter((book)=>book.rating>=4).map((book, index)=>(
              <div key={index} className="carousel-item" >
                  <BookCard book={book}/>
                  <Review book={book} />
              </div>

              ))
            }
          </ReactSimplyCarousel>
        </div>
      );
}

export default CarouselWrapper;