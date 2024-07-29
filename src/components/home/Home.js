import React, {useContext} from "react";
import HomeTopBar from "./HomeTopBar";
import CarouselWrapper from "../Carousel/CarouselWrapper";
import HomeBooksPanel from '../home/HomeBooksPanel';
import '../../styles/home.scss';
import BooksPanelContextProvider from "../BooksPanelContextProvider";

const Home = ()=>{

    return <div className="home">
        <HomeTopBar/>
        <div className="recommended">{"המלצת הצוות"}</div>
        <CarouselWrapper/>
        <div className="all-books-title">מגוון ספרים מכל הקטגוריות</div>
        <BooksPanelContextProvider>
            <HomeBooksPanel/>
        </BooksPanelContextProvider>
    </div>
}

export default Home;