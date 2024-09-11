import Axios from 'axios';

export const signup = async (email, password)=>{
    const endpoint = process.env.REACT_APP_BACKEND_SERVER + '/signup';
    const body = {
        user:{
            email,
            password
        }
    };
    const response = await Axios.post(endpoint, body);
    return response;
}

export const signin = async (email, password)=>{
    const endpoint = process.env.REACT_APP_BACKEND_SERVER + '/login';
    
    const user = {
        email,
        password
    }
    const response = await Axios.post(endpoint, {user});//
    return response;
}

export const deleteSignedInAccount = async ()=>{
    const endpoint = process.env.REACT_APP_BACKEND_SERVER + '/users';
    const token = localStorage.getItem('token');
    const payload = {
        headers: {
            auth: `Bearer ${token}`
        }
    }
    const response = await Axios.delete(endpoint, payload);
    return response;
}

export const editSignedInAccount = async (user)=>{
    const endpoint = process.env.REACT_APP_BACKEND_SERVER + '/users';
    const token = localStorage.getItem('token');
    const payload = {
        headers: {
            auth: `Bearer ${token}`
        },
    }
    const response = await Axios.put(endpoint, {user}, payload);
    return response;
}

export const authenticateAdmin = async (token)=>{
    const endpoint = process.env.REACT_APP_BACKEND_SERVER + '/authadmin';
    const response = await Axios.get(endpoint, {
        headers: {
            auth: `Bearer ${token}`
        }
    });
    return response;
}