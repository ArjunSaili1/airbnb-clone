import React, { useEffect } from 'react'
import Header from './Header'
import { useState } from 'react'
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
  const [loading, setLoading] = useState(false);
  const {bookingData, addData} = useDb();

  useEffect(()=>{
    if(bookingData["checkIn"] && bookingData["checkOut"] && bookingData["locationId"]){setModalScreen("warning")}
  }, [bookingData])

  useEffect(()=>{
    async function addBooking(){
      setLoading(true)
      await addData("checkIn", checkIn);
      await addData("checkOut", checkOut);
      await addData("locationId", location);
      setLoading(false)
      navigate("/my-booking")
    }
    if(checkIn && checkOut && location){
      addBooking()
    }
  }, [checkIn, checkOut, location, addData, navigate, bookingData])

  function removeWarning(){
    setModalScreen("date")
  }

  return (
    <div className="page">
      <Header/>
      <main className="page-content">
        {modalScreen === "loading" ? null :
        !modalScreen ? <BookingCarousel loading={loading} setLocation={setLocation}/> :
        <div className="modal-container">
          <div className="modal">
            {modalScreen === "date" ?
            <SetDatesModal setCheckIn={setCheckIn} setCheckOut={setCheckOut} setModalScreen={setModalScreen}/> :
            modalScreen === "location" ? 
            <SetLocationModal setModalScreen={setModalScreen}/> :
            modalScreen === "warning" ?
            <BookingWarning removeWarning={removeWarning}/> :
            null}
          </div>
        </div>}
      </main>
    </div>)
}
