import React, { useEffect, useState } from 'react'
import { ref, getDownloadURL } from "firebase/storage";
import useDb from '../../../../hooks/useDb';
import { storage } from '../../../../firebase';
import {Button} from '../../../SharedStyles'
import { StyledOptionInfo } from './BookingCarousel.styled';

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
            <img src={image} alt={details["name"]}/>
            <StyledOptionInfo>
                <div>
                    <h3>{details["name"]}</h3>
                    <h5>{details["address"]}</h5>
                    <h5>{details["city"]}</h5>
                    <h6>{details["description"]}</h6>
                </div>
                <Button submit style={{alignSelf: "flex-end"} }disabled={loading} onClick={handleSetBooking}>Book</Button>
            </StyledOptionInfo>
        </>
    :null
}
