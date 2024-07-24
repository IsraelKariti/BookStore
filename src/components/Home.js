import React from "react";
import SearchAppBar from "./SearchAppBar";
import CarouselWrapper from "./Carousel/CarouselWrapper";

const Home = ()=>{
    return <div className="home">
        <SearchAppBar/>
        <div className="recommended">{"המלצת הצוות"}</div>
        <CarouselWrapper/>
    </div>
}

export default Home;