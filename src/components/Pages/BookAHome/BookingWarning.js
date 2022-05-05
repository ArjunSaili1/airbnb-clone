import React from 'react'
import { useNavigate } from 'react-router'
import {Button, ModalHeader} from '../../SharedStyles'

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
            <h2>Warning</h2>
        </ModalHeader>
        <div style={{
            textAlign: "center",
            width: "80%",
        }}>
            <h5>You already have a booking</h5>
            <h6>Continuing will delete your previous booking</h6>
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
