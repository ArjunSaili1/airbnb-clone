import React from 'react'
import { useState } from 'react';
import { useDb } from '../contexts/DatabaseContext';

export default function SetDatesModal({setModalScreen}) {

    const [checkInDate, setCheckInDate] = useState(new Date().toLocaleDateString('en-ca'));
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const { addData } = useDb();

    async function handleSetDate(e){
        e.preventDefault()
        setLoading(true)
        await addData({checkIn: checkInDate, checkOut: checkOutDate});
        setLoading(false)
        setModalScreen("location")
    }

    function resetDates(){
        setCheckInDate(new Date().toLocaleDateString('en-ca'))
        setCheckOutDate(null)
    }

    return (
        <>
            <div className="modal-header">
                <h3>When will you be travelling?</h3>
            </div>
            <form onSubmit={handleSetDate} className="set-booking-form">
                <div className="set-booking-date">
                    <div className="date-set-field">
                        <label htmlFor="check-in-date"> Check In:</label>
                        <input min={new Date().toLocaleDateString('en-ca')} 
                        onChange={(e)=>{setCheckInDate(e.target.value)}}
                        max={checkOutDate}
                        required type="date"></input>
                    </div>
                    <div className="date-set-field">
                        <label htmlFor="check-out-date">Check Out:</label>
                        <input min={checkInDate}
                        onChange={(e)=>{setCheckOutDate(e.target.value)}}
                        required type="date"></input>
                    </div>
                </div>
                <div className="date-modal-btns">
                    <button onClick={resetDates} type="button" className="reset-date">Reset</button>
                    <button disabled={loading} type="submit" className="submit-date">Next</button>
                </div>
            </form>
        </>
    )
}
