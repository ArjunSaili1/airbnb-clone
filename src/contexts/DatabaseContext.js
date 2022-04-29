import React, { useContext, useState, useEffect, createContext } from 'react'
import { db } from '../firebase'
import { useAuth } from './AuthContext';
import { setDoc, doc, updateDoc, collection, getDocs, getDoc, query, where } from '@firebase/firestore';

const DatabaseContext = createContext();

export function useDb(){return useContext(DatabaseContext)}

export function DbProvider({children}){

    const { currentUser } = useAuth();
    const [locQuery, setLocQuery] = useState(null);
    const [userDoc, setUserDoc] = useState(null);
    const [hasBooking, setHasbooking] = useState(false);

    async function getLocationNames(){
        let names = [];
        const locations = await getDocs(collection(db, "locations"));
        locations.forEach((location)=>{
            names.push(location.data()["city"])
        })
        return names
    }

    async function addData(field, data){
        if(!userDoc){return}
        await updateDoc(userDoc, {
            [`booking.${field}`]: data
        })
        if(field === "locationId"){setHasbooking(true)}
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

    async function deleteBooking(){
        await updateDoc(userDoc, {
            booking: {}
        })
    }

    useEffect(()=>{

        async function checkForBooking(userId){
            const userData = await getDoc(doc(db, "users", userId))
            const bookingData = userData.data()["booking"]
            if(bookingData["checkIn"] && bookingData["checkOut"] && bookingData["locationId"]){
                setHasbooking(true)
                return true
            }
            setHasbooking(false)
            return false;
        }

        async function createBooking(userId){
            setUserDoc(doc(db, "users", userId));
            const result = await checkForBooking(userId)
            if(!result){
                await setDoc(doc(db, "users", userId), {
                    booking: {}
                })
            }
        }
        if(!currentUser){return}
        createBooking(currentUser.uid);
    }, [currentUser])

    return(
        <DatabaseContext.Provider value={{ addData, hasBooking, addQuery, queryLocations, deleteBooking, getLocationNames}}>
            {children}
        </DatabaseContext.Provider>
    )
}