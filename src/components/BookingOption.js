import React, { useEffect, useState } from 'react'
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';
import { motion } from 'framer-motion';  
import { useDb } from '../contexts/DatabaseContext';
import { useNavigate } from 'react-router';

export default function BookingOption({address, id, city, description, name, index, position}) {

    const [image, setImage] = useState(null);
    const {setBooking} = useDb();
    const navigate = useNavigate();

    useEffect(()=>{
        async function getBookingImage(){
            const imgSrc = await getDownloadURL(ref(storage, `images/${id}.jpg`))
            setImage(imgSrc);
        }
        getBookingImage();
    },[id])

    async function handleSetBooking(){
        await setBooking(id);
        navigate("/bookings")
    }

    return (
    <motion.article className="booking-option"
    style={index === position + 1? {zIndex: 100}: null}
    initial={{
        rotation: -180, 
        scale: 0}}
    animate={{
        rotation: 0, 
        scale: index === position + 1? 1 : 0.6,
        left: `${(index - position) * 35 - 52.5}vw `
    }}
    transition={{
        damping: 20
    }}>
        <img className="booking-img" src={image} alt={name}/>
        <div className="booking-details">
            <h3>{name}</h3>
            <h4>{address}</h4>
            <h4>{city}</h4>
            <h6><em>{description}</em></h6>
        </div>
        <button className="book-btn" onClick={handleSetBooking}>Book</button>
    </motion.article>
    )
}
