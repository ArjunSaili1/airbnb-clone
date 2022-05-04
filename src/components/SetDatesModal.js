import React from 'react'
import { useState, useRef } from 'react';
import Button from './sharedUI/Button';
import ModalHeader from './sharedUI/ModalHeader';
import BookingDateForm from '../styled/BookingDateForm';
import BookingDateFormMain from '../styled/BookingDateFormMain';
import BookingDateFormField from '../styled/BookingDateFormField';

export default function SetDatesModal({setCheckIn, setCheckOut, setModalScreen}) {

    const [min, setMin] = useState(new Date().toLocaleDateString('en-ca'));
    const [max, setMax] = useState(null);
    const checkInRef = useRef(null)
    const checkOutRef = useRef(null)


    function handleSetDate(e){
        e.preventDefault()
        setCheckIn(checkInRef.current.value)
        setCheckOut(checkOutRef.current.value)
        setModalScreen("location")
    }

    function resetDates(){
        setMin(new Date().toLocaleDateString('en-ca'))
        setMax(null)
    }

    return (
        <>
            <ModalHeader animate={{opacity: 1}} initial={{opacity: 0}}>
                <h3>When will you be travelling?</h3>
            </ModalHeader>
            <BookingDateForm 
            animate={{opacity: 1}} initial={{opacity: 0}}
            onSubmit={handleSetDate}>
                <BookingDateFormMain>
                    <BookingDateFormField>
                        <label htmlFor="check-in-date"> Check In:</label>
                        <input min={min} 
                        onChange={(e)=>{setMin(e.target.value)}}
                        max={max}
                        ref={checkInRef}
                        required type="date"></input>
                    </BookingDateFormField>
                    <BookingDateFormField>
                        <label htmlFor="check-out-date">Check Out:</label>
                        <input min={min}
                        ref={checkOutRef}
                        onChange={(e)=>{setMax(e.target.value)}}
                        required type="date"></input>
                    </BookingDateFormField>
                </BookingDateFormMain>
                <div style={{  
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between"}}>
                    <Button onClick={resetDates} type="button">Reset</Button>
                    <Button type="submit">Next</Button>
                </div>
            </BookingDateForm>
        </>
    )
}
