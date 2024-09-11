import React, {useEffect, useState, useContext} from 'react';
import '../styles/signin.scss';
import LockIcon from '@mui/icons-material/Lock';
import { signin } from '../auth/auth';
import { useNavigate } from 'react-router-dom';
import { BookStoreContext } from '../BookStoreContextProvider';
import { getAccount } from '../db/db';

export default function SignIn() {
    const {setLoggedInEmail} = useContext(BookStoreContext);

    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [emailClass, setEmailClass] = useState('sign-in__email-valid');

    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordClass, setPasswordClass] = useState('sign-in__password-valid');

    const [showError, setShowError] = useState(false);

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const navigate = useNavigate();

    const onEmailBlur = (e)=>{
        const emailValue = e.target.value;
        setEmail(emailValue)        
        setShowError(false);

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)
        if(validEmail){
            setIsEmailValid(true);
            setEmailClass('sign-in__email-valid');
        }
        else{
            console.log("email is NOT valid");
            setIsEmailValid(false);   
            setEmailClass('sign-in__email-invalid');
        }
    }

    const onPasswordBlur = (e)=>{
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        setShowError(false);

        if(passwordValue !== ''){
            setPasswordClass('sign-in__password-valid')
            setIsPasswordValid(true);
        }
        else{
            setPasswordClass('sign-in__password-invalid')
            setIsPasswordValid(false);
        }
    }

    const onFormSubmitted = async (e)=>{
        e.preventDefault();
        try{
            const response = await signin(email, password);
            const data = response.data;
            const token = data.token;
            localStorage.setItem('token', token);
            navigate('/home');
        }
        catch(e){
            setShowError(true);
        }
    }
    useEffect(()=>{
        setButtonDisabled(!isEmailValid || !isPasswordValid);
    }, [isEmailValid, isPasswordValid])

  return (
    <div className='sign-in'>
        <LockIcon/>
        <div className="sign-in__title">Sign in</div>
        <form action="" className="sign-in__form" onSubmit={onFormSubmitted}>
            <input type="text" className={emailClass} onBlur={onEmailBlur} placeholder='Email'/>
            <input type="password" className={passwordClass} onBlur={onPasswordBlur} placeholder='Password' />
            <button className={buttonDisabled?"sign-in__button-disabled":"sign-in__button-enabled"} type="submit" disabled={buttonDisabled}>SIGN IN</button>
            {showError && <div className='sign-in__error'>invalid email or password</div>}
        </form>
        <a href="/signup" className="sign-in__sign-up">Don't have and account? Sign up</a>
    </div>
  );
}