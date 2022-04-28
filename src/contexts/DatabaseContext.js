import React, { useContext, useState, useEffect, createContext } from 'react'
import { db } from '../firebase'
import { useAuth } from './AuthContext';
import { setDoc, doc, updateDoc, collection, addDoc, getDocs, query, where } from '@firebase/firestore';

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

    async function getBookingOptions(){
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
                city: location
            })
            return
        }
        await addDoc(bookingCollection, {
            city: location
        })
    }

    useEffect(()=>{
        if(!currentUser){return}
        setUserDoc(doc(db, "users", currentUser.uid))
    }, [currentUser])

    return(
        <DatabaseContext.Provider value={{ getBookingOptions, addDate, addUserToDb, addLocation, bookingExists, getLocationNames}}>
            {children}
        </DatabaseContext.Provider>
    )

}