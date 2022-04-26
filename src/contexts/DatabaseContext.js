import React, { useContext, useState, useEffect, createContext } from 'react'
import { db } from '../firebase'
import { useAuth } from './AuthContext';
import { setDoc, doc, updateDoc } from '@firebase/firestore';

const DatabaseContext = createContext();

export function useDb(){return useContext(DatabaseContext)}

export function DbProvider({children}){

    const { currentUser } = useAuth();
    const [userDoc, setUserDoc] = useState(null);

    async function addUserToDb(userId, name, email){
        setUserDoc(doc(db, "users", userId));
        await setDoc(doc(db, "users", userId), {
            name: name,
            email: email,
        })
    }

    async function addDate(checkInDate, checkOutDate){
        if(!userDoc){return}
        await updateDoc(userDoc, {
            checkIn: checkInDate,
            checkOut: checkOutDate
        })
    }

    async function addLocation(location){
        if(!userDoc){return}
        await updateDoc(userDoc, {
            location: location
        })
    }

    useEffect(()=>{
        if(currentUser){
            setUserDoc(doc(db, "users", currentUser.uid))
        }
    }, [currentUser])

    return(
        <DatabaseContext.Provider value={{userDoc, addDate, addUserToDb, addLocation}}>
            {children}
        </DatabaseContext.Provider>
    )

}