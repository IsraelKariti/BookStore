import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate} from 'react-router-dom';
import '../styles/appBar.scss';

const AppBar = ({title})=>{
    const navigate = useNavigate();
    const onHomeClicked = ()=>{
        navigate("/");
    }

    return <div className="app-bar__header">
        <HomeIcon className='app-bar__home' onClick={onHomeClicked}/>
        <div className="app-bar__title">{title}</div>
    </div>
}

export default AppBar;