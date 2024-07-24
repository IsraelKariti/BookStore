export const booksInitialState = [
    {
        id: "0",
        name: "רעם אילם",
        author: "יהודה ניב",
        prevPrintedPrice: 86.00,
        printedPrice: 77.90,
        prevDigitalPrice: 49.9,
        digitalPrice: 34.50,
        imgPath: "https://images-evrit.yit.co.il/Images/Products/newcovers/raam_master.jpg",
    },
    {
        id: "1",
        name: "מוקף באידיוטים",
        author: "תומס אריקסון",
        prevPrintedPrice: 98.00,
        printedPrice: 78.90,
        prevDigitalPrice: 44.9,
        digitalPrice: 28.50,
        imgPath: "https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/011374400-1635767704318358.jpg",
    },
    {
        id: "2",
        name: "ארבע ההסכמות",
        author: "דון מיגל רואיס",
        prevPrintedPrice: 74.00,
        printedPrice: 59.20,
        prevDigitalPrice: 39.00,
        digitalPrice: 28.00,
        imgPath: "https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/013370973-1714896993267157.jpg",
    },
    {
        id: "3",
        name: "להתאהב ולהשאר בחיים",
        author: "שרון צוהר",
        prevPrintedPrice: 98.00,
        printedPrice: 59.90,
        prevDigitalPrice: 35.00,
        digitalPrice: 28.00,
        imgPath: "https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/012010275-16753459451015534.jpg",
    },
    {
        id: "4",
        name: "כראמל 8 גברת בלום שולטת",
        author: "מאירה ברנע גולדברג",
        prevPrintedPrice: 84.00,
        printedPrice: 67.20,
        prevDigitalPrice: 42.00,
        digitalPrice: 28.00,
        imgPath: "https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/011374903-1698220042604439.jpg",
    },
    {
        id: "5",
        name: "כשהגלים מתחזקים",
        author: "שרון צוהר",
        prevPrintedPrice: 98.00,
        printedPrice: 59.90,
        prevDigitalPrice: 35.00,
        digitalPrice: 28.00,
        imgPath: "https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/011051081-1635697355480829.jpg",
    },
    {
        id: "6",
        name: "השקעות לעצלנים",
        author: "תמיר מנדובסקי",
        prevPrintedPrice: 89.00,
        printedPrice: 71.20,
        prevDigitalPrice: 32.00,
        digitalPrice: 25.60,
        imgPath: "https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/011251352-164502225375980.jpg",
    },
    {
        id: "7",
        name: "הרגלים אטומיים",
        author: "ג'יימס קליר",
        prevPrintedPrice: 118.00,
        printedPrice: 94.40,
        prevDigitalPrice: 59.00,
        digitalPrice: 47.20,
        imgPath: "https://www.steimatzky.co.il/pub/media/catalog/product/cache/054fd023ed4beb824f3143faa6fcc008/0/1/013621301-1635788041597070.jpg",
    },
];

export const booksReducer = (state, action)=>{
    switch(action.type){
        case "ADD":
            return [...state, action.book];
        case "REMOVE":
            const filteredBooks = state.filter(book=>book.id !== action.bookId);
            return filteredBooks;
        case "EDIT":
            const editedBooks = state.map(book=>{
                if(book.id !== action.id){
                    return book;
                }
                else{
                    return action.book;
                }
            });
            return editedBooks;
        default:
            return state;
    }
}