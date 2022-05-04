import React, {useRef} from 'react'
import { useAuth } from '../contexts/AuthContext';
import Header from './Header'
import Page from '../styled/Page';
import PageContent from '../styled/PageContent';
import Button from '../styled/Button';
import UpdateFormSection from '../styled/UpdateFormSection';
import UpdateForm from '../styled/UpdateForm';
import UpdateProfilePicWrapper from '../styled/UpdateProfilePicWrapper';
import ProfilePic from '../styled/ProfilePic';

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
    <Page>
        <Header/>
        <PageContent animate={{opacity: 1}} initial={{opacity: 0}}>
            <UpdateForm onSubmit={handleUpdateProfile}>
                <UpdateProfilePicWrapper>
                    <div>
                        <ProfilePic alt={displayName} src={photoURL}/>
                    </div>
                    <UpdateFormSection>
                        <h3>Profile Picture</h3>
                        <input ref={fileRef} type="file" accept="image/png, image/jpeg"></input>
                    </UpdateFormSection>
                </UpdateProfilePicWrapper>
                <UpdateFormSection>
                    <h3>Full Name</h3>
                    <input ref={nameRef} type="text" defaultValue={displayName}/>
                </UpdateFormSection>
                <UpdateFormSection>
                    <h3>Email</h3>
                    <input type="text" defaultValue={email}/>
                </UpdateFormSection>
                <UpdateFormSection>
                    <h3>Phone Number</h3>
                    <input htmlFor="phone" type="tel" defaultValue={phoneNumber}/>
                </UpdateFormSection>
                <UpdateFormSection>
                    <h3>Reset Password</h3>
                    <div>
                        <Button onClick={sendResetEmail}>Send Reset Email</Button>
                    </div>
                </UpdateFormSection>
                <Button type="submit">Submit</Button>
            </UpdateForm>
        </PageContent>
    </Page>
    )
}
