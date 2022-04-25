import React from 'react'
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router';

export default function RequireBooking({children}) {
    const [loading, setLoading] = useState(true);
    const [hasBooked, setHasBooked] = useState("init")
    const {currentUser} = useAuth();

    useEffect(()=>{
        async function checkIfBooked(){
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                if(docSnap.data()["booking"]){setHasBooked(true)}
                else{setHasBooked(false)}
            }
            else{setHasBooked(false)}
            setLoading(false);
        }

        checkIfBooked();

    }, [currentUser])

    return(<>
        {loading ? null :
        hasBooked ? children :  <Navigate to="/book-home"/>}
        </>
    )
}
