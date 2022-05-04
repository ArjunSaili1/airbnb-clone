import React, { useContext } from 'react'
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytes} from '@firebase/storage';
import { 
    createUserWithEmailAndPassword, 
    updateProfile,
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    sendPasswordResetEmail,
    signOut
} from '@firebase/auth';
import { createContext,useState, useEffect} from "react";
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth(){ return useContext(AuthContext) }

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null);

    function signUp(email, password, name){
        createUserWithEmailAndPassword(auth, email, password).then((userCred)=>{
            updateName(name, userCred)
            setProfilePic(userCred, false);
        })
    }

    function updateName(name, userCred){
        updateProfile(userCred ? userCred.user : currentUser, {
            displayName: name
        })
    }

    async function updateProfilePic(profilePicFile){
        if(!currentUser){console.log()}
        const profilePicRef = ref(storage, `profile-pictures/${currentUser.uid}`)
        console.log(profilePicRef)
        try{
            const profilePicUpload = await uploadBytes(profilePicRef, profilePicFile);
            setProfilePic(null, profilePicUpload.ref)
        }
        catch{
            return false;
        } 
    }

    function setProfilePic(userCred, fileRef){
        let file = fileRef ? fileRef : ref(storage, "profile-pictures/Default.jpg")
        getDownloadURL(file).then((url)=>{
            updateProfile(userCred ? userCred.user : currentUser, {
                photoURL: url
            })  
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

    useEffect(() => {
        console.log(currentUser )
    }, [currentUser])
    

    return (
        <AuthContext.Provider value={{currentUser, signUp, updateProfilePic, updateName, login, forgotPassword, signOutUser}}>
            {children}
        </AuthContext.Provider>
    )
}
