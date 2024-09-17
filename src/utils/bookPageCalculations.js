import { numberOfBooksInPage, numberOfIdealPagesInPagination } from "./constants";

export const calculateAdjacentPages = (count, currPageIndex)=>{
    const numberOfPossiblePages = Math.ceil( count / numberOfBooksInPage); 
    const numberOfAdjacentPages = Math.floor(numberOfIdealPagesInPagination/2);

    const possibleIndexOfStartPage = currPageIndex - numberOfAdjacentPages;
    const indexOfStartPage = Math.max(1, possibleIndexOfStartPage);
    const missingStartPages = 2 - (currPageIndex - indexOfStartPage);

    if(missingStartPages > 0){
        const possibleIndexOfEndPage = currPageIndex + numberOfAdjacentPages + missingStartPages;
        const indexOfEndPage = Math.min(numberOfPossiblePages, possibleIndexOfEndPage);
        return {indexOfStartPage, indexOfEndPage};
    }

    const possibleIndexOfEndPage = currPageIndex + numberOfAdjacentPages;
    const indexOfEndPage = Math.min(numberOfPossiblePages, possibleIndexOfEndPage);
    const missingEndPages = 2 - (indexOfEndPage - currPageIndex);

    if(missingEndPages > 0){
        const possibleIndexOfStartPage = currPageIndex - numberOfAdjacentPages - missingEndPages;
        const indexOfStartPage = Math.max(1, possibleIndexOfStartPage);
        return {indexOfStartPage, indexOfEndPage};
    }

    return {indexOfStartPage, indexOfEndPage};
}

