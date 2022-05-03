import React, { useRef, useState } from 'react'
import Modal from '../styled/Modal';
import ModalWrapper from '../styled/ModalWrapper';
import { useDb } from '../contexts/DatabaseContext'

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
        <div className="overlay" onClick={hideModal}></div>
        <ModalWrapper>
                <Modal>
                    <div className="modal-header">
                        <h1>Edit Booking</h1>
                    </div>
                    <form onSubmit={editBooking}>  
                        <div className="edit-form">
                            <h4>Check In</h4>
                            <input min={min}
                            max={max}
                            onChange={(e)=>{setMin(e.target.value)}}
                            ref={checkInRef} 
                            type="date" 
                            defaultValue={bookingData["checkIn"]}/>
                        </div>    
                        <div className="edit-form">
                            <h4>Check Out</h4>
                            <input min={min} 
                            max={max}
                            onChange={(e)=>{setMax(e.target.value)}}
                            ref={checkOutRef} 
                            type="date" 
                            defaultValue={bookingData["checkOut"]}/>
                        </div>   
                        <div className="edit-form-btns">
                            <button onClick={hideModal}>Cancel</button>
                            <button type="submit">Edit</button>
                        </div>
                    </form>
                </Modal>
            </ModalWrapper>
    </>)
}
