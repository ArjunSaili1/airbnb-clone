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
            const {address, city, description, name, id} = location;
            return <BookingOption key={id} id={id} address={address} city={city} description={description} name={name}/>
        }): null}
    </div>
    )
}
