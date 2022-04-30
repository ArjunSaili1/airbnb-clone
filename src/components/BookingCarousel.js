import React, { useEffect, useState } from 'react'
import { useDb } from '../contexts/DatabaseContext'
import BookingOption from './BookingOption'
import { motion } from 'framer-motion'

export default function BookingCarousel({setLocation, loading}) {

    const { queryLocations } = useDb()
    const [locationIds, setLocationIds] = useState(null)
    const [position, setPosition] = useState(0);

    useEffect(()=>{
        async function setBookingOptions(){
            const queryResult = await queryLocations()
            setLocationIds(queryResult);
        }
        setBookingOptions()
    },[queryLocations])

    function moveRight(){
        if(position === locationIds.length - 2){
            setPosition(-1)
        }
        if(position < locationIds.length - 2){
            setPosition(position + 1)
        }
    }

    function moveLeft(){
        if(position === -1){
            setPosition(locationIds.length - 2)
        }
        if(position > -1){
            setPosition(position - 1)
        } 
    }

    return (
    <>
        <div className="booking-carousel-ctn">
            <div className="booking-carousel">
                {locationIds ? locationIds.map((id, index )=>{
                    return(
                    <motion.article 
                    key={id} 
                    className="booking-option"
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
                        <BookingOption 
                        setLocation={setLocation}
                        loading={loading}
                        locationId={id}/>
                    </motion.article>
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
