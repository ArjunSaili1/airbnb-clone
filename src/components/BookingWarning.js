import React from 'react'
import { useNavigate } from 'react-router'

export default function BookingWarning({removeWarning}) {
    const nav = useNavigate()

    function handleCancel(e){
        e.preventDefault()
        nav("/my-booking")
    }

    async function handleContinue(e){
        e.preventDefault()
        removeWarning()
    }

    return (
    <>
        <div className="modal-header">
            <h3>Warning</h3>
            <h5>You already have a booking</h5>
            <em><h6>Continuing will delete your previous booking</h6></em>
        </div>
        <form className="warning-btns">
            <button onClick={handleContinue}>Continue</button>
            <button onClick={handleCancel}>Cancel</button>
        </form>
    </>
    )
}
