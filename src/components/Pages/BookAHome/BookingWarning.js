import React from 'react'
import { useNavigate } from 'react-router'
import Button from '../../SharedStyles/Button'
import ModalHeader from '../../SharedStyles/ModalHeader'

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
            <h3>Warning</h3>
            <h5>You already have a booking</h5>
            <em><h6>Continuing will delete your previous booking</h6></em>
        </ModalHeader>
        <form style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly"
        }}>
            <Button cancel onClick={handleCancel}>Cancel</Button>
            <Button submit onClick={handleContinue}>Continue</Button>
        </form>
    </>
    )
}
