import React from 'react'
import { useState, useRef } from 'react';
import Button from '../styled/Button';
import ModalHeader from '../styled/ModalHeader';

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
            <form 
            animate={{opacity: 1}} initial={{opacity: 0}}
            onSubmit={handleSetDate} className="set-booking-form">
                <div className="set-booking-date">
                    <div className="date-set-field">
                        <label htmlFor="check-in-date"> Check In:</label>
                        <input min={min} 
                        onChange={(e)=>{setMin(e.target.value)}}
                        max={max}
                        ref={checkInRef}
                        required type="date"></input>
                    </div>
                    <div className="date-set-field">
                        <label htmlFor="check-out-date">Check Out:</label>
                        <input min={min}
                        ref={checkOutRef}
                        onChange={(e)=>{setMax(e.target.value)}}
                        required type="date"></input>
                    </div>
                </div>
                <div className="date-modal-btns">
                    <Button onClick={resetDates} type="button">Reset</Button>
                    <Button type="submit">Next</Button>
                </div>
            </form>
        </>
    )
}
