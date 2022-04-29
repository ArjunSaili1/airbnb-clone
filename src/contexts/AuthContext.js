import React, { useContext } from 'react'
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
            updateProfile(userCred.user,{
                displayName: name
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

    return (
        <AuthContext.Provider value={{currentUser, signUp, login, forgotPassword, signOutUser}}>
            {children}
        </AuthContext.Provider>
    )
}
