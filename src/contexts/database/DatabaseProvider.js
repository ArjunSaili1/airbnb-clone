import React, { useState, useEffect } from 'react'
import DatabaseContext from './DatabaseContext';
import { db } from '../../firebase'
import useAuth from '../../hooks/useAuth';
import { 
    setDoc, 
    deleteDoc,
    doc, 
    updateDoc, 
    collection, 
    getDocs, 
    getDoc, 
    query, 
    where, 
    onSnapshot } from '@firebase/firestore';

export function DbProvider({children}){

    const { currentUser } = useAuth();
    const [bookingDoc, setBookingDoc] = useState(null)
    const [bookingData, setBookingData] = useState({})
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
            results.push(loc.id)
        })
        return results
    }

    async function getBookingDetails(id){
        const details = await getDoc(doc(db, "locations", id))
        if(details.exists()){return details.data()}
        return false
    }

    async function deleteBooking(){
        if(!bookingDoc){return false}
        await deleteDoc(bookingDoc)
    }

    useEffect(()=>{
        if(!currentUser){return}
        const bookDoc = doc(db, "bookings", currentUser.uid)
        async function makeDoc(){
            await setDoc(doc(db, "bookings", currentUser.uid), {})
        }
        const unsub = onSnapshot(bookDoc, (booking) =>{
            if(booking.data() === undefined){
                makeDoc();
            }
            else{
                setBookingData(booking.data())
            }
        })
        setBookingDoc(bookDoc);
        return unsub
    }, [currentUser])

    const value = { 
        addData, 
        deleteBooking, 
        getBookingDetails, 
        bookingData,
        addQuery,
        queryLocations,
        getLocationNames}

    return(
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}