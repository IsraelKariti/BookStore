import React, {useContext, useEffect, useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { BookStoreContext } from '../../BookStoreContextProvider';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { jwtDecode } from "jwt-decode";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function HomeTopBar() {
  const {setSearchTerm, setPagesCurrIndex, setPagesStartIndex} = useContext(BookStoreContext);
  const [activeUserEmail, setActiveUserEmail] = useState(null);

  const navigate = useNavigate();

  const onSearchChanges = (e)=>{
    setSearchTerm(e.target.value);
    setPagesCurrIndex(1);
    setPagesStartIndex(1);//?????
  }

  const onSearchSubmitted = (e)=>{
    if(e.key === 'Enter'){
      navigate('/search');
    }
  }

  const handleMenu = ()=>{
    navigate("/account");
  }
  const onLoginClicked = ()=>{
    navigate("/signin");
  }

  const onCartClicked = ()=>{
    navigate('/cart');
  }
  useEffect(()=>{
    // TODO: 1. Change to get the email from a token
    const token = localStorage.getItem('token');
    // 2. extract the email from the token 
    if(token != null){
      const payload = jwtDecode(token);
      setActiveUserEmail(payload.email);
    }
  },[]);
  return (
    <Box sx={{ flexGrow: 1, position: "fixed", top: 0, width: "100%", zIndex:"1" }}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: "green"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={onCartClicked}
          >
            <ShoppingCartIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Book Store
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={onSearchChanges} // Attach onChange handler here
              onKeyDown={onSearchSubmitted}
            />
          </Search>
          {activeUserEmail === null || activeUserEmail === ''?
           <Button color="inherit" onClick={onLoginClicked}>Login</Button> :
           <IconButton
           size="large"
           aria-label="account of current user"
           aria-controls="menu-appbar"
           aria-haspopup="true"
           onClick={handleMenu}
           color="inherit"
         >
           <AccountCircle />
         </IconButton>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
