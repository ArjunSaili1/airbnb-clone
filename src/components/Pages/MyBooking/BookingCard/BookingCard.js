import React, { useEffect, useState } from 'react'
import { ref, getDownloadURL } from "firebase/storage";
import useDb from '../../../../hooks/useDb';
import useAuth from '../../../../hooks/useAuth';
import { storage } from '../../../../firebase';
import { BookingCardFooter, BookingCardWrapper, BookingCardMain, BookingImage } from './BookingCard.styled';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import InfoIconFilled from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from '../EditModal/EditModal';
import { AnimatePresence, motion } from 'framer-motion';

export default function BookingCard({bookingData}) {

    const {checkIn, checkOut, locationId} = bookingData;
    const [image, setImage] = useState(null);
    const {currentUser} = useAuth()
    let [firstName] = currentUser.displayName.split(" ")
    const {getBookingDetails, deleteBooking} = useDb();
    const [bookingInfo, setBookingInfo] = useState(null);
    const [showDetails, setShowDetails] = useState(true)
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
        <AnimatePresence>
        {showEdit ? 
            <EditModal key="edit-modal" bookingData={bookingData} hideModal={hideModal}/> : null}
        </AnimatePresence>
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <BookingCardWrapper style={{backgroundColor: `#${bookingInfo["color"]}`}}>
                <BookingImage src={image} alt={bookingInfo["name"]}/>
                <BookingCardMain>
                    <h3>{firstName}'s booking at {bookingInfo["name"]} in {bookingInfo["city"]}</h3>
                    <h5>From: {checkIn} To: {checkOut}</h5>
                    <BookingCardFooter>
                        <div style={{padding: "10px 0"}}>
                            <button onClick={()=> setShowDetails(!showDetails)}>{!showDetails ? <InfoIcon/> : <InfoIconFilled/>}</button>
                            <button onClick={()=> setShowEdit(true)}><EditIcon/></button>
                            <button onClick={handleDelete}><DeleteIcon/></button>
                        </div>
                        <AnimatePresence>
                            {showDetails ? 
                            <div 
                            key="booking-card-details-dropdown">
                                <h5>Address: {bookingInfo["address"]}</h5>
                                <h6>Description: {bookingInfo["description"]}</h6>
                            </div> : null}
                        </AnimatePresence>
                    </BookingCardFooter>
                </BookingCardMain>
            </BookingCardWrapper>
        </motion.div>
    </>
    :null
}
