import React, {useState, useEffect, useContext } from "react";
import { BookStoreContext } from "../../BookStoreContextProvider";
import BookCard from "../BookCard/BookCard";
import ReactSimplyCarousel from 'react-simply-carousel';

const CarouselWrapper = ()=>{
    const {booksState} = useContext(BookStoreContext);
    const [numFav, setNumFav] = useState(1);
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const bookCardWrapperStyle = { 
        width: 150, 
        height: 300, 
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    useEffect(()=>{
        window.addEventListener("resize", ()=>{
            const width = window.innerWidth;
            if(width < 350){
                console.log(":::1");
                setNumFav(1);
            }
            else if(width < 400){
                console.log(":::2");
                setNumFav(2);
            }
            else if(width < 690){
                console.log(":::3");
                setNumFav(3);
            }
            else if(width < 820){
                console.log(":::4");
                setNumFav(4);
            }
            else if(width < 1000){
                console.log(":::5");
                setNumFav(5);
            }
            else{
                console.log(":::6");
                setNumFav(6);
            }
        })
    },[]);
    
    return (
        <div>
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
                itemsToShow: 6,
                itemsToScroll: 1,
                minWidth: 768,
              },
            ]}
            speed={400}
            easing="ease-out"
          >
            {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
            <div style={bookCardWrapperStyle}>
                <BookCard book={booksState[0]}/>
            </div>
            <div style={bookCardWrapperStyle}>
                <BookCard book={booksState[1]}/>
            </div>
            <div style={bookCardWrapperStyle}>
                <BookCard book={booksState[2]}/>
            </div>
            <div style={bookCardWrapperStyle}>
                <BookCard book={booksState[3]}/>
            </div>
            <div style={bookCardWrapperStyle}>
                <BookCard book={booksState[4]}/>
            </div>
            <div style={bookCardWrapperStyle}>
                <BookCard book={booksState[5]}/>
            </div>
            <div style={bookCardWrapperStyle}>
                <BookCard book={booksState[6]}/>
            </div>
            <div style={bookCardWrapperStyle}>
                <BookCard book={booksState[7]}/>
            </div>
          </ReactSimplyCarousel>
        </div>
      );
}

export default CarouselWrapper;