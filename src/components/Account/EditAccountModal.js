import React, {useEffect, useState} from "react";
import { getAccount, editAccount } from "../../db/db";
import '../../styles/editAccountModal.scss';
import {changeEmail} from '../../auth/auth';

const EditAccountModal = ({closeEditModal, isAdmin = false})=>{
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDOB] = useState('');
    const [signUpDate, setSignUpDate] = useState('');
    const [lastSignIn, setLastSignIn] = useState('');
    
    const [isInvalidEmail, setInvalidEmail] = useState(false);

    const onEmailChanged = (e)=>{

        const emailValue = e.target.value;
        console.log(emailValue);
        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        setInvalidEmail(!validEmail);
        setEmail(emailValue);
    }
    const onFormSubmitted = async (e)=>{
        e.preventDefault();
        const account = {
            id,
            firstName,
            lastName,
            email,
            phone,
            dob,
            signUpDate,
            lastSignIn,
        }
        if(localStorage.getItem('email') !== email)
            await changeEmail(email, isAdmin);
    
        await editAccount(account);
        localStorage.setItem('email', email);
        closeEditModal();
    }
    const onCancelClicked = (e)=>{
        closeEditModal();
    }

    useEffect(()=>{
        (async ()=>{
            const sessionEmail = localStorage.getItem('email');
            const account = await getAccount(sessionEmail);
            setId(account.id);
            setFirstName(account.firstName);
            setLastName(account.lastName);
            setEmail(account.email);
            setPhone(account.phone);
            setDOB(account.dob);
            setSignUpDate(account.signUpDate);
            setLastSignIn(account.lastSignIn);
        })();
    },[]);
    return <div className="modal-background">
    <div className="edit-account-modal">
        <div className="edit-account-modal__header">
            <div className="edit-account-modal__title">Edit your profile</div>
        </div>
        <form onSubmit={onFormSubmitted}>
            <div className="edit-account-modal__names">
                <div className="edit-account-modal__first-name-container">
                    <div className="edit-account-modal__first-name-label">First name</div>
                    <input className="edit-account-modal__first-name" type="text" placeholder="first name" value={firstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                </div>
                <div className="edit-account-modal__last-name-container">
                    <div className="edit-account-modal__last-name-label">Last name</div>
                    <input className="edit-account-modal__last-name" type="text" placeholder="last name" value={lastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                </div>
            </div>
            <div className="edit-account-modal__email-container">
                <div className="edit-account-modal__email-label">Email</div>
                <input className="edit-account-modal__email" type="email" placeholder="email"  value={email}  onChange={onEmailChanged}/>
                {isInvalidEmail && <div className="edit-account-modal__email-error">Invalid email</div>}
            </div>
            <div className="edit-account-modal__phone-container">
                <div className="edit-account-modal__phone-label">Phone</div>
                <input className="edit-account-modal__phone" type="text" placeholder="phone"  value={phone}  onChange={(e)=>{setPhone(e.target.value)}}/>
            </div>
            <div className="edit-account-modal__dob-container">
            <div className="edit-account-modal__dob-label">Date of birth</div>
                <input className="edit-account-modal__dob" type="date" placeholder="date of birth" value={dob} onChange={(e)=>{setDOB(e.target.value)}} />
            </div>
            <div className="edit-account-modal__buttons">
                <button className="edit-account-modal__save" type="submit" disabled={isInvalidEmail} >SAVE</button>
                <button className="edit-account-modal__cancel" onClick={onCancelClicked}>CANCEL</button>
            </div>
        </form>
    </div>
    </div>
}

export default EditAccountModal;