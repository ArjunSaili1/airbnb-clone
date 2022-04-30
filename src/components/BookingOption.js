import React, { useEffect, useState } from 'react'
import { ref, getDownloadURL } from "firebase/storage";
import { useDb } from '../contexts/DatabaseContext';
import { storage } from '../firebase';

export default function BookingOption({locationId, setLocation, loading}) {

    const [image, setImage] = useState(null);
    const {getBookingDetails} = useDb();
    const [details, setDetails] = useState(null);

    useEffect(()=>{
        async function getDetails(){
            setDetails(await getBookingDetails(locationId))
            setImage(await getDownloadURL(ref(storage, `images/${locationId}.jpg`)))
        }

        getDetails()
    },[locationId, getBookingDetails])

    function handleSetBooking(){
        setLocation(locationId)
    }

    return details ? 
        <>
            <img className="booking-option-img" src={image} alt={details["name"]}/>
            <div className="booking-option-details">
                <h3>{details["name"]}</h3>
                <h4>{details["address"]}</h4>
                <h4>{details["city"]}</h4>
                <h6><em>{details["description"]}</em></h6>
            </div>
            <button className="book-btn" disabled={loading} onClick={handleSetBooking}>Book</button>
        </>
    :null
}
