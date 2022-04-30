import React, { useEffect, useState } from 'react'
import { useDb } from '../contexts/DatabaseContext'
import BookingOption from './BookingOption'

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
                    <BookingOption 
                    setLocation={setLocation}
                    loading={loading}
                    key={id} 
                    locationId={id}
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
