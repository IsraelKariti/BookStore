import './styles/styles.scss';
import BookStoreContextProvider from './BookStoreContextProvider';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import PageNotFound from './components/PageNoteFound';
import Home from './components/home/Home';
import Search from './components/searchPage/Search';
import BookPage from './components/BookPage/BookPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AccountRouteWraper from './components/Account/AccountRouteWrapper';
import CartPage from './components/Cart/CartPage';
import AdminPrivateRoute from './components/Admin/AdminPrivateRoute';

import { signup } from './auth/auth';
import { nanoid } from 'nanoid';
import {addAccount} from './db/db';

function App() {
  // signup('admin@bookstore.com', '123456');
  // const storeUserDetailsInDB = ()=>{
  //   const id = nanoid();

  //  const currDate = '';
  //   const currTime = new Date(Date.now()).toString().slice(4, 24);

  //   const data = {
  //       id,
  //       firstName: '',
  //       lastName: '',
  //       email: 'admin@bookstore.com',
  //       phone: '',
  //       dob: '',
  //       signUpDate: currDate,
  //       lastSignIn: currTime,
  //   }
  //   addAccount(data);
  // }
  // storeUserDetailsInDB();
  return (
    <div className="app">
      <BookStoreContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home"/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/books/:id" element={<BookPage/>} />
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/account" element={<AccountRouteWraper/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/admin" element={<AdminPrivateRoute/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
      </BookStoreContextProvider>
    </div>
  );
}

export default App;
