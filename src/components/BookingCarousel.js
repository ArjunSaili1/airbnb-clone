import React, { useEffect, useState } from 'react'
import { useDb } from '../contexts/DatabaseContext'
import BookingOption from './BookingOption'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Carousel from '../styled/Carousel';
import CarouselWrapper from '../styled/CarouselWrapper';
import CarouselButtons from '../styled/CarouselButtons';
import StyledOption from '../styled/StyledOption';

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
        <CarouselWrapper>
            <Carousel>
                {locationIds ? locationIds.map((id, index )=>{
                    return(
                    <StyledOption
                    key={id} 
                    style={index === position + 1? {zIndex: 100}: null}
                    initial={{
                        rotation: -180, 
                        scale: 0}}
                    animate={{
                        rotation: 0, 
                        scale: index === position + 1? 1 : 0.6,
                        left: `${(index - position) * 35 - 52.5}vmax `
                    }}
                    transition={{
                        damping: 20
                    }}>
                        <BookingOption 
                        setLocation={setLocation}
                        loading={loading}
                        locationId={id}/>
                    </StyledOption>
                    )
                }): null}
            </Carousel>
        </CarouselWrapper>
        <CarouselButtons>
            <button onClick={moveRight} style={{right: -10, zIndex: 1000}}><ArrowForwardIosIcon style={{fontSize: "3em", color:"red"}}/></button>
            <button onClick={moveLeft} style={{left: -10, zIndex: 1000, color: "red"}}><ArrowBackIosIcon style={{fontSize: "3em", color:"red"}}/></button>
        </CarouselButtons>
    </>
    )
}
