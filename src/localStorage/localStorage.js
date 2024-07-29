export const addBookToActiveUserInLocalStorage = (book)=>{
    const cartItemsString = localStorage.getItem('cartItems');
    // console.log(cartItems);
    // if there are no books for this active user
    if(cartItemsString === null || cartItemsString === ''){
        localStorage.setItem('cartItems',JSON.stringify([{book, amount:1}]));
    }
    // if there are books
    else{
        let cartItems = JSON.parse(cartItemsString);
        let foundBook = false;
        for(let i = 0; i < cartItems.length; i++){
            if(cartItems[i].book.id === book.id){
                cartItems[i].amount++;
                foundBook = true;
                break;
            }
        }
        // if book is new
        if(foundBook === false){
            cartItems = [...cartItems, {book,amount:1}];
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

}

export const removeBookFromActiveUserInLocalStorage = (bookToRemove)=>{
    const cartItemsString = localStorage.getItem('cartItems');
    if(cartItemsString === '')
        return;
    let cartItems = JSON.parse(cartItemsString);
    const filteredCartItems = cartItems.filter(item=>{
        return item.book.id !== bookToRemove.id
    });
    const filteredCartItemsString = JSON.stringify(filteredCartItems);
    localStorage.setItem('cartItems', filteredCartItemsString);
}

export const increaseBookAmount = (bookToIncrease)=>{
    const cartItemsString = localStorage.getItem('cartItems');
    // if there are no books at all
    if(cartItemsString == null || cartItemsString === ''){
        localStorage.setItem('cartItems', JSON.stringify([{amount: 1, book: bookToIncrease}]));
        return;
    }
        
    // if there are some books
    let cartItems = JSON.parse(cartItemsString);
    let flag = false;
    for(let i = 0; i < cartItems.length; i++){
        if(cartItems[i].book.id === bookToIncrease.id){
            cartItems[i].amount++;
            flag = true;
            break;
        }
    }
    // if book to increase was not in the existing books
    if(!flag){
        cartItems = [...cartItems, {book: bookToIncrease, amount: 1}];
    }
    const CartItemsString = JSON.stringify(cartItems);
    localStorage.setItem('cartItems', CartItemsString);
}

export const decreaseBookAmount = (bookToIncrease)=>{
    const cartItemsString = localStorage.getItem('cartItems');
    if(cartItemsString === '')
        return;
    let cartItems = JSON.parse(cartItemsString);
    for(let i = 0; i < cartItems.length; i++){
        if(cartItems[i].book.id === bookToIncrease.id){
            cartItems[i].amount = cartItems[i].amount - 1 || 1;
            break;
        }
    }
    const CartItemsString = JSON.stringify(cartItems);
    localStorage.setItem('cartItems', CartItemsString);
}