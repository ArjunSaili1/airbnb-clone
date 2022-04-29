import React, { useContext, useState, useEffect, createContext } from 'react'
import { db } from '../firebase'
import { useAuth } from './AuthContext';
import { setDoc, doc, updateDoc, collection, addDoc, getDocs, query, where, deleteDoc } from '@firebase/firestore';

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
        let bookingSnap;
        const bookingCollection = collection(userDoc, "booking")
        const bookings = await getDocs(bookingCollection);
        bookings.forEach((bookingDoc)=>{
            bookingSnap = bookingDoc
            booking = doc(db, 'users', currentUser.uid, "booking", bookingDoc.id);
        })
        return {booking, bookingCollection, bookingSnap};
    }

    async function queryLocations(){
        const results = []
        const {bookingSnap} = await bookingExists();
        const userLocation = bookingSnap.data()["city"]
        const locationQuery = query(collection(db, "locations"), where("city", "==", userLocation));
        const resultDocs = await getDocs(locationQuery);
        resultDocs.forEach((loc)=>{
            const result = loc.data();
            result["id"] = loc.id
            results.push(result)
        })
        return results
    }

    async function deleteBooking(){
        const {booking} = await bookingExists()
        await deleteDoc(booking)
    }

    async function addData(data){
        if(!userDoc){return}
        const {booking, bookingCollection} = await bookingExists()
        if(booking){
            await updateDoc(booking, {
                ...data
            })
            return;
        }
        await addDoc(bookingCollection, {
            ...data
        })
    }

    useEffect(()=>{
        if(!currentUser){return}
        setUserDoc(doc(db, "users", currentUser.uid))
    }, [currentUser])

    return(
        <DatabaseContext.Provider value={{ addData, queryLocations, deleteBooking, addUserToDb, bookingExists, getLocationNames}}>
            {children}
        </DatabaseContext.Provider>
    )

}