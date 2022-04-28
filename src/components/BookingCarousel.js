import React, { useEffect, useState } from 'react'
import { useDb } from '../contexts/DatabaseContext'
import { motion } from 'framer-motion'
import BookingOption from './BookingOption'

export default function BookingCarousel() {

    const { getBookingOptions } = useDb()
    const [options, setOptions] = useState(null)
    const [position, setPosition] = useState(0);

    useEffect(()=>{
        async function setBookingOptions(){
            const optionsResults = await getBookingOptions()
            setOptions(optionsResults);
        }
        setBookingOptions()
    },[getBookingOptions])

    function moveRight(){
        if(position === options.length - 1){
            setPosition(0)
        }
        if(position < options.length - 2){
            setPosition(position + 1)
        }

    }

    function moveLeft(){
        if(position === options.length - 1){
            setPosition(0)
        }
        if(position > -1){
            setPosition(position - 1)
        } 
    }

    return (
    <>
        <div className="booking-carousel-ctn">
            <div className="booking-carousel">
                {options ? options.map((location, index )=>{
                    const {address, city, description, name, id} = location;
                    return(
                    <BookingOption key={id} 
                    id={id} 
                    address={address}  
                    city={city} 
                    description={description} 
                    name={name}
                    index={index}
                    position={position}/>
                    )
                }): null}
            </div>
        </div>
        <div className="carousel-btns" style={{width: "100vw"}}>
            <button onClick={moveRight} style={{right: 0}}>Right</button>
            <button onClick={moveLeft} style={{left: 0}}>Left</button>
        </div>
    </>
    )
}
