import React, { useEffect, useState } from 'react'
import useDb from '../../../../hooks/useDb';
import BookingOption from './BookingOption'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Carousel, CarouselWrapper, CarouselButtons, StyledOption, CarouselArrow} from './BookingCarousel.styled';

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

    function moveLeft(){
        if(position === locationIds.length - 2){
            setPosition(-1)
        }
        if(position < locationIds.length - 2){
            setPosition(position + 1)
        }
    }

    function moveRight(){
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
            <CarouselArrow right onClick={moveRight}><ArrowBackIosIcon/></CarouselArrow>
            <CarouselArrow left onClick={moveLeft}><ArrowForwardIosIcon style={{transform: "translateX(0.25em)"}}/></CarouselArrow>
        </CarouselButtons>
    </>
    )
}
