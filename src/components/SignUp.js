import React, {useEffect, useState, useContext} from 'react';
import '../styles/signup.scss';
import LockIcon from '@mui/icons-material/Lock';
import { signup } from '../auth/auth';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { BookStoreContext } from '../BookStoreContextProvider';
import {addAccount} from '../db/db';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailClass, setEmailClass] = useState('sign-up__email-valid');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordClass, setPasswordClass] = useState('sign-up__password-valid');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const {setLoggedInEmail} = useContext(BookStoreContext);

    const navigate = useNavigate();

    const onEmailBlur = (e)=>{
        const emailValue = e.target.value;
        setEmail(emailValue)        
        
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        if(validEmail){
            setIsEmailValid(true);
            setEmailClass('sign-up__email-valid');
            setEmailErrorMessage('');
        }
        else{
            setIsEmailValid(false);   
            setEmailClass('sign-up__email-invalid');
            setEmailErrorMessage('invalid email');
        }
    }

    const onPasswordBlur = (e)=>{
        const passwordValue = e.target.value;
        setPassword(passwordValue);

        if(passwordValue.length >= 6){
            setPasswordClass('sign-up__password-valid')
            setIsPasswordValid(true);
            setPasswordErrorMessage('');
        }
        else{
            setPasswordClass('sign-up__password-invalid')
            setIsPasswordValid(false);
            setPasswordErrorMessage('email must be at least 6 characters');
        }
    }

    const getCurrDate = ()=>{
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        let currentDate = `${day}/${month}/${year}`;
        return currentDate;
    }

    const storeUserDetailsInDB = ()=>{
        const id = nanoid();

       const currDate = getCurrDate();
        const currTime = new Date(Date.now()).toString().slice(4, 24);

        const data = {
            id,
            firstName: '',
            lastName: '',
            email,
            phone: '',
            dob: '',
            signUpDate: currDate,
            lastSignIn: currTime,
        }
        addAccount(data);
    }

    const onFormSubmitted = async (e)=>{
        e.preventDefault();
        setButtonDisabled(true);
        try{
            const res = await signup(email, password);
            const idToken = res.data.idToken;
            localStorage.setItem('idToken', idToken);
            localStorage.setItem('email', email);
            setLoggedInEmail(email);
            storeUserDetailsInDB();
            navigate('/home');
        }
        catch(e){
            const msg = e.response.data.error.message;
            if(msg === 'EMAIL_EXISTS'){
                setEmailErrorMessage('email already exists');
                setIsEmailValid(false);
            }
            if(msg === 'INVALID_EMAIL'){
                setEmailErrorMessage('email invalid');
                setIsEmailValid(false);
            }
        }
    }
    useEffect(()=>{
        setButtonDisabled(!isEmailValid || !isPasswordValid);
    }, [isEmailValid, isPasswordValid])

  return (
    <div className='sign-up'>
        <LockIcon/>
        <div className="sign-up__title">Sign up</div>
        <form action="" className="sign-up__form" onSubmit={onFormSubmitted}>
            <input type="text" className={emailClass} onBlur={onEmailBlur} placeholder='Enter your email'/>
            <div className='sign-up__error-message'>{emailErrorMessage}</div>
            <input type="password" className={passwordClass} onBlur={onPasswordBlur} placeholder='Choose a password' />
            <div className='sign-up__error-message'>{passwordErrorMessage}</div>
            <button className={buttonDisabled?"sign-up__button-disabled":"sign-up__button-enabled"} type="submit" disabled={buttonDisabled}>SIGN UP</button>
        </form>
        <a href="/signin" className="sign-up__sign-in">Already have and account? Sign in</a>
    </div>
  );
}