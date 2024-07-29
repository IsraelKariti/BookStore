import React from 'react';
import '../../styles/review.scss';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarsIcon from '@mui/icons-material/Stars';

const Review = ({book})=>{
    return <div className="review">
        <FormatQuoteIcon sx={{fontSize:'78px'}}/>
        <div className='review-text'>{book.review}</div>
        <div className='rating'>
            {Array(book.rating).fill(0).map((_,i)=><StarsIcon key={i}/>)}    
        </div>
        <FormatQuoteIcon sx={{fontSize:'78px'}}/>
    </div>
}

export default Review;