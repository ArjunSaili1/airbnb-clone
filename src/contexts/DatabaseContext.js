import React, { useContext, useState, useEffect, createContext } from 'react'
import { db } from '../firebase'
import { useAuth } from './AuthContext';
import { setDoc, doc, updateDoc, collection, getDocs, query, where, onSnapshot } from '@firebase/firestore';

const DatabaseContext = createContext();

export function useDb(){return useContext(DatabaseContext)}

export function DbProvider({children}){

    const { currentUser } = useAuth();
    const [bookingDoc, setBookingDoc] = useState(null)
    const [bookingData, setBookingData] = useState(null)
    const [locQuery, setLocQuery] = useState(null);

    async function getLocationNames(){
        let names = [];
        const locations = await getDocs(collection(db, "locations"));
        locations.forEach((location)=>{
            names.push(location.data()["city"])
        })
        return names
    }

    async function addData(field, data){
        if(!bookingData){return false}
        await updateDoc(bookingDoc, {
            [field]: data
        })
    }

    function addQuery(query){
        setLocQuery(query)
    }

    async function queryLocations(){
        const results = []
        const locationQuery = query(collection(db, "locations"), where("city", "==", locQuery));
        const resultDocs = await getDocs(locationQuery);
        resultDocs.forEach((loc)=>{
            const result = loc.data();
            result["id"] = loc.id
            results.push(result)
        })
        return results
    }

    useEffect(()=>{
        if(!currentUser){return}
        const bookDoc = doc(db, "bookings", currentUser.uid)
        const unsub = onSnapshot(bookDoc, (booking) =>{
            setBookingData(booking.data())
        })
        setBookingDoc(bookDoc);
        return unsub
    }, [currentUser])

    useEffect(()=>{
        if(!currentUser){return}
        async function makeDoc(){
            await setDoc(doc(db, "bookings", currentUser.uid), {})
        }
        if(!bookingData){
            makeDoc();
        }
    }, [bookingData, currentUser])

    return(
        <DatabaseContext.Provider value={{ addData, bookingData, addQuery, queryLocations, getLocationNames}}>
            {children}
        </DatabaseContext.Provider>
    )
}