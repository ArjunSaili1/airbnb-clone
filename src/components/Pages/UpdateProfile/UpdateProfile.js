import React, {useRef} from 'react'
import useAuth from '../../../hooks/useAuth'
import Header from '../../Header/Header'
import useAccount from '../../../hooks/useAccount'
import {Page, PageContent, Button} from '../../SharedStyles'
import { UpdateForm, UpdateFormSection, UpdateProfilePicWrapper, ProfilePic } from './UpdateProfile.styled';

export default function UpdateAccount() {

    const fileRef = useRef(null)
    const nameRef = useRef(null);
    const {loading, error, statusUpdate} = useAccount()
    const {updateProfilePic, currentUser, forgotPassword, updateName} = useAuth()
    const {photoURL, displayName, email, phoneNumber} = currentUser;

    async function handleUpdateProfile(e){
        e.preventDefault()
        if(fileRef.current.files[0]){
            statusUpdate({type: "form_submit"});
            const upload = await updateProfilePic(fileRef.current.files[0])
            if(!upload){statusUpdate({type: "error"})}
        }
        if(nameRef.current.value){updateName(nameRef.current.value)}
        if(!loading){window.location.reload()}
    }

    function sendResetEmail(e){
        e.preventDefault()
        forgotPassword(email);
    }

    return (
    <Page>
        <Header/>
        <PageContent style={{flex: "0 0 auto"}}animate={{opacity: 1}} initial={{opacity: 0}}>
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
                        <Button style={{fontSize: "0.7rem"}} cancel onClick={sendResetEmail}>Send Reset Email</Button>
                    </div>
                </UpdateFormSection>
                <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                    <Button style={{fontSize: "1rem"}} submit disabled={loading} type="submit">Submit</Button>
                    {error ? <h5 style={{color: "red"}}>There was an error uploading your file</h5> : null}
                </div>
            </UpdateForm>
        </PageContent>
    </Page>
    )
}
