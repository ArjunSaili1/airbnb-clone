import React, { useEffect, useState } from 'react'
import { ref, getDownloadURL } from "firebase/storage";
import { useDb } from '../../../../contexts/DatabaseContext';
import { useAuth } from '../../../../contexts/AuthContext';
import { storage } from '../../../../firebase';
import { BookingCardFooter, BookingCardWrapper, BookingCardMain, BookingImage } from './BookingCard.styled';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import InfoIconFilled from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from '../EditModal/EditModal';

export default function BookingCard({bookingData}) {

    const {checkIn, checkOut, locationId} = bookingData;
    const [image, setImage] = useState(null);
    const {currentUser} = useAuth()
    let [firstName] = currentUser.displayName.split(" ")
    const {getBookingDetails, deleteBooking} = useDb();
    const [bookingInfo, setBookingInfo] = useState(null);
    const [showDetails, setShowDetails] = useState(false)
    const [showEdit, setShowEdit] = useState(false);

    async function handleDelete(){
        await deleteBooking()
    }

    function hideModal(){
        setShowEdit(false)
    }

    useEffect(()=>{
        async function getDetails(){
            setBookingInfo(await getBookingDetails(locationId))
            setImage(await getDownloadURL(ref(storage, `images/${locationId}.jpg`)))
        }
        getDetails()
    },[locationId, getBookingDetails])

    return bookingInfo ? 
        <>
            {showEdit ? 
            <EditModal bookingData={bookingData} hideModal={hideModal} show={showEdit}/> : null}
            <BookingCardWrapper style={{backgroundColor: `#${bookingInfo["color"]}`}}>
                <BookingImage src={image} alt={bookingInfo["name"]}/>
                <BookingCardMain>
                    <h3>{firstName}'s booking at {bookingInfo["name"]} in {bookingInfo["city"]}</h3>
                    <h5>From: {checkIn} To: {checkOut}</h5>
                    <BookingCardFooter style={{height: "3em"}}>
                        <div>
                            <button onClick={()=> setShowDetails(!showDetails)}>{!showDetails ? <InfoIcon/> : <InfoIconFilled/>}</button>
                            <button onClick={()=> setShowEdit(true)}><EditIcon/></button>
                            <button onClick={handleDelete}><DeleteIcon/></button>
                        </div>
                        <div style={{
                            padding: "5px 0"
                        }}>
                            <h5>{showDetails ? `Address: ${bookingInfo["address"]}` : null}</h5>
                            <h5>{showDetails ? `Description: ${bookingInfo["description"]}` : null}</h5>
                        </div>
                    </BookingCardFooter>
                </BookingCardMain>
            </BookingCardWrapper>
        </>
    :null
}
