import React from 'react'
import { storage } from '../../firebase';
import AuthContext from './AuthContext';
import { ref, getDownloadURL, uploadBytes} from '@firebase/storage';
import { 
    createUserWithEmailAndPassword, 
    updateProfile,
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut
} from '@firebase/auth';
import { useState, useEffect} from "react";
import { auth } from '../../firebase';

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null);

    async function signUp(email, password, name){
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        updateName(name, userCred)
        setProfilePic(userCred, false);
        return userCred;
    }

    function updateName(name, userCred){
        updateProfile(userCred ? userCred.user : currentUser, {
            displayName: name
        })
    }

    async function updateProfilePic(profilePicFile){
        if(!currentUser){}
        const profilePicRef = ref(storage, `profile-pictures/${currentUser.uid}`)
        try{
            const profilePicUpload = await uploadBytes(profilePicRef, profilePicFile);
            setProfilePic(null, profilePicUpload.ref)
        }
        catch{
            return false;
        } 
    }

    async function setProfilePic(userCred, fileRef){
        let file = fileRef ? fileRef : ref(storage, "profile-pictures/Default.jpg")
        const url = await getDownloadURL(file);
        updateProfile(userCred ? userCred.user : currentUser, {
            photoURL: url
        })
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function forgotPassword(email){
        return sendPasswordResetEmail(auth, email);
    }

    function signOutUser(){
        return signOut(auth);
    }

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        })
    }, [])

    const value = {
        currentUser, 
        signUp, 
        updateProfilePic, 
        updateName, 
        login, 
        forgotPassword, 
        signOutUser}

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
