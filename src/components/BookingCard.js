import React, { useEffect, useState } from 'react'
import { ref, getDownloadURL } from "firebase/storage";
import { useDb } from '../contexts/DatabaseContext';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../firebase';

export default function BookingCard({bookingData}) {

    const {checkIn, checkOut, locationId} = bookingData;
    const [image, setImage] = useState(null);
    const {currentUser} = useAuth()
    let [firstName, ...lastName] = currentUser.displayName.split(" ")
    const {getBookingDetails} = useDb();
    const [details, setDetails] = useState(null);

    useEffect(()=>{
        async function getDetails(){
            setDetails(await getBookingDetails(locationId))
            setImage(await getDownloadURL(ref(storage, `images/${locationId}.jpg`)))
        }
        getDetails()
    },[locationId, getBookingDetails])

    return details ? 
        <div style={{backgroundColor: `#${details["color"]}`}}className="booking">
            <img className="booked-img" src={image} alt={details["name"]}/>
            <div className="booked-details">
                <h3>{firstName}'s booking at {details["name"]} in {details["city"]}</h3>
                <h5>From: {checkIn} To: {checkOut}</h5>
                <div className="update-btns">
                    <button>View Details</button>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    :null
}
