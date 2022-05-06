import React from 'react'
import { useNavigate } from 'react-router'
import {Button, ModalHeader} from '../../../SharedStyles'

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
        <ModalHeader>
            <h2>You Already Have a Booking</h2>
        </ModalHeader>
        <div style={{
            textAlign: "center",
        }}>
            <h5 style={{color: "var(--primary)"}}>Continuing will delete your previous booking</h5>
        </div>
        <form style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly"}}>
                <Button cancel onClick={handleCancel}>Cancel</Button>
                <Button submit onClick={handleContinue}>Continue</Button>
        </form>
    </>
    )
}
