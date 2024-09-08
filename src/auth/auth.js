import Axios from 'axios';

const signinAddress="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=";
const deleteSignedInAccountAddress="https://identitytoolkit.googleapis.com/v1/accounts:delete?key=";
const updateEmailAddress="https://identitytoolkit.googleapis.com/v1/accounts:update?key=";

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
    const endpoint = signinAddress+process.env.REACT_APP_AUTH_API_KEY;
    console.log('goodbyw');
    
    const body = {
        email,
        password,
        returnSecureToken: true,
    }
    const response = await Axios.post(endpoint, body);//
    return response;
    // await Axios.post('https://localhost:4000', {
    //     email,
    //     password
    // });
}

export const deleteSignedInAccount = async ()=>{
    const endpoint = deleteSignedInAccountAddress+process.env.REACT_APP_AUTH_API_KEY;
    const localIdToken = localStorage.getItem('idToken');
    const body = {
        idToken: localIdToken,
    }
    const response = await Axios.post(endpoint, body);
    return response;
}

export const changeEmail = async (newEmail)=>{
    const endpoint = updateEmailAddress+process.env.REACT_APP_AUTH_API_KEY;
    const localIdToken = localStorage.getItem('idToken');
    const body = {
        idToken: localIdToken,
        email: newEmail,
        returnSecureToken: true,
    }
    const response = await Axios.post(endpoint, body);
    localStorage.setItem('idToken', response.data.idToken);
}