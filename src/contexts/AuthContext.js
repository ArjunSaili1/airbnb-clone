import React, { useContext } from 'react'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    sendPasswordResetEmail
} from '@firebase/auth';
import { createContext,useState, useEffect} from "react";
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth(){ return useContext(AuthContext) }

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null);

    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function forgotPassword(email){
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            setCurrentUser(user);
        })
    }, [])

    return (
        <AuthContext.Provider value={{currentUser, signUp, login, forgotPassword}}>
            {children}
        </AuthContext.Provider>
    )
}
