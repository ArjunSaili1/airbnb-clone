import React, { useEffect, useState } from 'react'
import { useDb } from '../contexts/DatabaseContext'
import BookingOption from './BookingOption'

export default function BookingCarousel() {

    const { getBookingOptions } = useDb()
    const [options, setOptions] = useState(null)

    useEffect(()=>{
        async function setBookingOptions(){
            const optionsResults = await getBookingOptions()
            setOptions(optionsResults);
        }
        setBookingOptions()
    },[getBookingOptions])

    return (
    <div>
        {options ? options.map((location)=>{
            const {address, city, description, image, name, id} = location;
            return <BookingOption key={id} address={address} city={city} description={description} image={image} name={name}/>
        }): null}
    </div>
    )
}
