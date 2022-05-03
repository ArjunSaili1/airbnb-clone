import React, { useEffect, useState } from 'react'
import Header from './Header'
import Modal from '../styled/Modal'
import ModalWrapper from '../styled/ModalWrapper'
import SetLocationModal from './SetLocationModal'
import SetDatesModal from './SetDatesModal'
import BookingWarning from './BookingWarning'
import BookingCarousel from './BookingCarousel'
import { useDb } from '../contexts/DatabaseContext'
import { useNavigate } from 'react-router'

export default function BookHome() {

  const navigate = useNavigate()
  const [modalScreen, setModalScreen] = useState("date")
  const [location, setLocation] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [newBooking, setNewBooking] = useState(false)
  const [loading, setLoading] = useState(false);
  const {bookingData, addData} = useDb();

  useEffect(()=>{
    if(bookingData["checkIn"] && bookingData["checkOut"] && bookingData["locationId"] &&!newBooking){setModalScreen("warning")}
  }, [bookingData, newBooking])

  useEffect(()=>{
    async function addBooking(){
      setNewBooking(true)
      setLoading(true)
      await addData("checkIn", checkIn);
      await addData("checkOut", checkOut);
      await addData("locationId", location);
      setLoading(false)
      navigate("/my-booking")
      return;
    }
    if(checkIn && checkOut && location){
      addBooking()
    }
  }, [checkIn, checkOut, location, addData, navigate])

  function removeWarning(){
    setModalScreen("date")
  }

  return (
    <div className="page">
      <Header/>
      <main className="page-content">
        {modalScreen === "loading" ? null :
        !modalScreen ? <BookingCarousel loading={loading} setLocation={setLocation}/> :
        <ModalWrapper>
          <Modal>
            {modalScreen === "date" ?
            <SetDatesModal setCheckIn={setCheckIn} setCheckOut={setCheckOut} setModalScreen={setModalScreen}/> :
            modalScreen === "location" ? 
            <SetLocationModal setModalScreen={setModalScreen}/> :
            modalScreen === "warning" ?
            <BookingWarning removeWarning={removeWarning}/> :
            null}
          </Modal>
        </ModalWrapper>}
      </main>
    </div>)
}
