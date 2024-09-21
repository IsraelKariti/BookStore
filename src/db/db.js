import Axios from 'axios';

export const addAccount = async (account)=>{
    const dest = process.env.REACT_APP_DB+'accounts/'+account.id+'.json';
    const response = await Axios.post(dest, account);
    return response;
}

export const getAccount = async (email)=>{
    const url = process.env.REACT_APP_BACKEND_SERVER+'/users';
    const token = localStorage.getItem('token');
    const response = await Axios.get(url, {
        headers: {
            auth: `Bearer ${token}`
        }
    });
    return response.data;
}

export const deleteAccount = async (id)=>{
    let response = await Axios.delete(process.env.REACT_APP_DB+'accounts/'+id+'.json');
}

export const editAccount = async (account)=>{
    await deleteAccount(account.id);
    const response = await Axios.post(process.env.REACT_APP_DB+'accounts/'+account.id+'.json', account);
    return response;
}

export const increaseBookAmountInActiveUserInDB = async (book)=>{
    const token = localStorage.getItem('token');
    if(token == null)
        return;
    // verify that the token is valid
    const verifulUrl = process.env.REACT_APP_BACKEND_SERVER + '/verify/user';
    const verifyResponse = await Axios.get(verifulUrl, {
        headers: {
            auth: `Bearer ${token}`
        }
    });

    if(verifyResponse.status !== 200){
        return;
    }

    const response = await Axios.put(
        process.env.REACT_APP_BACKEND_SERVER+'/users/inc', 
        {...book},
        {headers:{
            auth: `Bearer ${token}`
        }}
    );
    // const elements = Object.values(response.data);
    // for(let i = 0; i < elements.length; i++){
    //     const account = Object.values(elements[i])[0];
    //     // if found account of active user
    //     if(account.email === email){
    //         const cartItems = account.cartItems;
    //         // if there are no books at all
    //         if(cartItems == null){
    //             account.cartItems = [{book,amount:1}];
    //         }
    //         // if there are some books than find this book
    //         else {
    //             let foundBook = false;
    //             for(let i = 0; i < cartItems.length; i++){
    //                 if(cartItems[i].book.id === book.id){
    //                     cartItems[i].amount++;
    //                     foundBook = true;
    //                     break;
    //                 }
    //             }
    //             // if book is new
    //             if(foundBook === false){
    //                 account.cartItems = [...cartItems, {book,amount:1}];
    //             }
    //         }

    //         editAccount(account);
    //     }
    // }
}

export const decreaseBookAmountInActiveUserInDB = async (book)=>{
    const email = localStorage.getItem('email');
    if(email == null || email === "null" || email === "undefined" || email === '' )
        return;

    const response = await Axios.get(process.env.REACT_APP_DB+'accounts.json/');
    const elements = Object.values(response.data);
    for(let i = 0; i < elements.length; i++){
        const account = Object.values(elements[i])[0];
        // if found account of active user
        if(account.email === email){
            const cartItems = account.cartItems;
            // if there are no books at all
            if(cartItems == null){
                return;
            }
            // if there are some books than find this book
            else {
                for(let i = 0; i < cartItems.length; i++){
                    if(cartItems[i].book.id === book.id){
                        cartItems[i].amount = cartItems[i].amount - 1 || 1;
                        break;
                    }
                }
            }

            editAccount(account);
        }
    }
}
export const removeBookFromActiveUserInDB = async (book)=>{
    const email = localStorage.getItem('email');
    const response = await Axios.get(process.env.REACT_APP_DB+'accounts.json/');
    const elements = Object.values(response.data);
    for(let i = 0; i < elements.length; i++){
        const account = Object.values(elements[i])[0];
        // if found account of active user
        if(account.email === email){
            const cartItems = account.cartItems;
            const filteredItems = cartItems.filter(item=>item.book.id !== book.id);

            account.cartItems = filteredItems;
            editAccount(account);
        }
    }
}

export const setDiscountInDB = async (discount)=>{
    const token = localStorage.getItem('token');
    const response = await Axios.post(process.env.REACT_APP_BACKEND_SERVER+'/settings', {
        key: 'discount',
        value: discount
    }, {
        headers:{
            auth: `Bearer ${token}`
        }
    });
}

export const getDiscountFromDB = async ()=>{
    const token = localStorage.getItem('token');
    const response = await Axios.post(process.env.REACT_APP_BACKEND_SERVER+'/settings/get', {
        setting:{
            key: 'discount',
        }
    }, {
        headers:{
            auth: `Bearer ${token}`
        }
    });
    return response.data.value;
}

export const addBookToDB = async (book)=>{
    const url = process.env.REACT_APP_BACKEND_SERVER+'/books/create';
    const token = localStorage.getItem('token');
    const headers = {
        auth: `Bearer ${token}`
    }
    
    try{
        const response = await Axios.post(url, book, {headers});
        return response;
    }
    catch(e){
        console.log(e);
    }
}