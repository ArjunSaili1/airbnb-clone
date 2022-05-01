import React, { useEffect, useState } from 'react'
import { ref, getDownloadURL } from "firebase/storage";
import { useDb } from '../contexts/DatabaseContext';
import { useAuth } from '../contexts/AuthContext';
import { storage } from '../firebase';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import InfoIconFilled from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BookingCard({bookingData}) {

    const {checkIn, checkOut, locationId} = bookingData;
    const [image, setImage] = useState(null);
    const {currentUser} = useAuth()
    let [firstName, ...lastName] = currentUser.displayName.split(" ")
    const {getBookingDetails, deleteBooking} = useDb();
    const [details, setDetails] = useState(null);
    const [showDetails, setShowDetails] = useState(false)

    async function handleDelete(){
        await deleteBooking()
    }

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
                <div className="booking-footer" style={{height: "3em"}}>
                    <div className="update-btn">
                        <button onClick={()=> setShowDetails(!showDetails)}>{!showDetails ? <InfoIcon/> : <InfoIconFilled/>}</button>
                        <button><EditIcon/></button>
                        <button onClick={handleDelete}><DeleteIcon/></button>
                    </div>
                    <div className="details-ctn">
                        <h5>{showDetails ? `Address: ${details["address"]}` : null}</h5>
                        <h5>{showDetails ? `Description: ${details["description"]}` : null}</h5>
                    </div>
                </div>
            </div>
        </div>
    :null
}
