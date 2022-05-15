import React, { useRef, useState } from 'react'
import {Modal, ModalWrapper, Button, ModalHeader, Overlay} from '../../../SharedStyles'
import useDb from '../../../../hooks/useDb';
import { EditBookingForm } from './EditModal.styled';

export default function EditModal({ bookingData, hideModal}) {
    
    const {addData} = useDb();
    const [min, setMin] = useState(bookingData["checkIn"])
    const [max, setMax] = useState(null)
    const checkInRef = useRef(null);
    const checkOutRef = useRef(null);


    async function editBooking(e){
        e.preventDefault();
        await addData("checkIn", checkInRef.current.value);
        await addData("checkOut", checkOutRef.current.value);
        hideModal()
    }

    return(
    <>
        <Overlay 
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        style={{top: 0}} onClick={hideModal}></Overlay>
        <ModalWrapper>
            <Modal initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                <ModalHeader>
                    <h1>Edit Booking</h1>
                </ModalHeader>
                <form onSubmit={editBooking}>  
                    <EditBookingForm>
                        <h4>Check In</h4>
                        <input min={min}
                        max={max}
                        onChange={(e)=>{setMin(e.target.value)}}
                        ref={checkInRef} 
                        type="date" 
                        defaultValue={bookingData["checkIn"]}/>
                    </EditBookingForm>    
                    <EditBookingForm>
                        <h4>Check Out</h4>
                        <input min={min} 
                        max={max}
                        onChange={(e)=>{setMax(e.target.value)}}
                        ref={checkOutRef} 
                        type="date" 
                        defaultValue={bookingData["checkOut"]}/>
                    </EditBookingForm>   
                    <div style={{  
                        padding: "5% 0 0 0",
                        display: "flex",
                        justifyContent: "space-between"}}>
                        <Button cancel onClick={hideModal}>Cancel</Button>
                        <Button submit type="submit">Edit</Button>
                    </div>
                </form>
            </Modal>
        </ModalWrapper>
    </>)
}
