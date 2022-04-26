import React, { useContext, useState, useEffect, createContext } from 'react'
import { db } from '../firebase'
import { useAuth } from './AuthContext';
import { setDoc, doc, updateDoc, collection, addDoc, getDocs } from '@firebase/firestore';

const DatabaseContext = createContext();

export function useDb(){return useContext(DatabaseContext)}

export function DbProvider({children}){

    const { currentUser } = useAuth();
    const [userDoc, setUserDoc] = useState(null);

    async function getLocationNames(){
        let names = [];
        const locations = collection(db, "locations");
        const locationsDocs = await getDocs(locations);
        locationsDocs.forEach((location)=>{
            names.push(location.data()["city"])
        })
        return names
    }

    async function addUserToDb(userId, name, email){
        setUserDoc(doc(db, "users", userId));
        await setDoc(doc(db, "users", userId), {
            name: name,
            email: email,
        })
    }

    async function bookingExists(){
        let booking = false;
        const bookingCollection = collection(userDoc, "booking")
        const bookings = await getDocs(bookingCollection);
        bookings.forEach((bookingDoc)=>{
            booking = doc(db, 'users', currentUser.uid, "booking", bookingDoc.id);
        })
        return {booking, bookingCollection};
    }

    async function addDate(checkInDate, checkOutDate){
        if(!userDoc){return}
        const {booking, bookingCollection} = await bookingExists()
        if(booking){
            await updateDoc(booking, {
                checkIn: checkInDate,
                checkOut: checkOutDate
            })
            return;
        }
        await addDoc(bookingCollection, {
            checkIn: checkInDate,
            checkOut: checkOutDate
        })
    }

    async function addLocation(location){
        if(!userDoc){return}
        const {booking, bookingCollection} = await bookingExists();
        if(booking){
            await updateDoc(booking, {
                location: location
            })
            return
        }
        await addDoc(bookingCollection, {
            location: location
        })
    }

    useEffect(()=>{
        if(!currentUser){return}
        setUserDoc(doc(db, "users", currentUser.uid))
    }, [currentUser])

    return(
        <DatabaseContext.Provider value={{ addDate, addUserToDb, addLocation, getLocationNames}}>
            {children}
        </DatabaseContext.Provider>
    )

}