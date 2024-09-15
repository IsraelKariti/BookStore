import Axios from "axios";

export const getBookPagesByRange = async (start, end, size)=>{
    const url = process.env.REACT_APP_BACKEND_SERVER + `/books/range?start=${start}&end=${end}&size=${size}`;
    try{
        const response = await Axios.get(url);
        if(response.status === 200){
            const pages = response.data;
            return pages;
        }
        else{
            return null;
        }
    }
    catch(e){
        console.log(e);
        return null;
    }
}