import './styles/styles.scss';
import BookStoreContextProvider from './BookStoreContextProvider';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import PageNotFound from './components/PageNoteFound';
import Home from './components/Home';

function App() {
  return (
    <div className="app">
      <BookStoreContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/home"/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </BrowserRouter>
      </BookStoreContextProvider>
    </div>
  );
}

export default App;
