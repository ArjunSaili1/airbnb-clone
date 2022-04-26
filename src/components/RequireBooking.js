import React from 'react'
import { useEffect, useState } from 'react';
import { useDb } from '../contexts/DatabaseContext';
import { Navigate } from 'react-router';

export default function RequireBooking({children}) {
    const [loading, setLoading] = useState(true);
    const [hasBooked, setHasBooked] = useState("init")
    const {bookingExists} = useDb();

    useEffect(()=>{
        async function checkIfBooked(){
            const {booking} = await bookingExists();
            if(booking){setHasBooked(true)}
            else{setHasBooked(false)}
            setLoading(false)
        }
        checkIfBooked();
    }, [bookingExists])

    return(<>
        {loading ? null :
        hasBooked ? children :  <Navigate to="/book-home"/>}
        </>
    )
}
