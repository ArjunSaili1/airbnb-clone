import React, { useEffect, useState } from 'react'
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';

export default function BookingOption({address, id, city, description, name}) {

    const [image, setImage] = useState(null);

    useEffect(()=>{
        async function getBookingImage(){
            const imgSrc = await getDownloadURL(ref(storage, `images/${id}.jpg`))
            setImage(imgSrc);
        }

        getBookingImage();
    },[id])

    return (
    <div>
        <h1>{address}</h1>
        <h1>{city}</h1>
        <h1>{description}</h1>
        <img className="booking-img" src={image} alt={name}/>
        <h1>{name}</h1>
    </div>
    )
}
