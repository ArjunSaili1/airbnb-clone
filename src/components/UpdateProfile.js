import React, {useRef} from 'react'
import { useAuth } from '../contexts/AuthContext';
import Header from './Header'

export default function UpdateAccount() {

    const fileRef = useRef(null)
    const nameRef = useRef(null);
    const {updateProfilePic, currentUser, forgotPassword, updateName} = useAuth()
    const {photoURL, displayName, email, phoneNumber} = currentUser;

    function handleUpdateProfile(e){
        e.preventDefault()
        if(fileRef.current.files[0]){updateProfilePic(fileRef.current.files[0])}
        if(nameRef.current.value){updateName(nameRef.current.value)}
    }

    function sendResetEmail(e){
        e.preventDefault()
        forgotPassword(email);
    }

    return (
    <div className="page">
        <Header/>
        <div className="page-content">
            <form onSubmit={handleUpdateProfile} className="update-profile-form">
                <div className="profile-pic-ctn">
                    <div className="profile-pic">
                        <img alt={displayName} src={photoURL}/>
                    </div>
                    <div className="update-form-section">
                        <h3>Profile Picture</h3>
                        <input ref={fileRef} type="file" accept="image/png, image/jpeg"></input>
                    </div>
                </div>
                <div className="update-form-section">
                    <h3>Full Name</h3>
                    <input ref={nameRef} type="text" defaultValue={displayName}/>
                </div>
                <div className="update-form-section">
                    <h3>Email</h3>
                    <input type="text" defaultValue={email}/>
                </div>
                <div className="update-form-section">
                    <h3>Phone Number</h3>
                    <input htmlFor="phone" type="tel" defaultValue={phoneNumber}/>
                </div>
                <div className="update-form-section">
                    <h3>Reset Password</h3>
                    <div>
                        <button onClick={sendResetEmail}>Send Reset Email</button>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
    )
}
