import React, { useEffect } from 'react'
import Header from './Header'
import { useState } from 'react'
import SetLocationModal from './SetLocationModal'
import SetDatesModal from './SetDatesModal'
import BookingWarning from './BookingWarning'
import BookingCarousel from './BookingCarousel'
import { useDb } from '../contexts/DatabaseContext'

export default function BookHome() {

  const [modalScreen, setModalScreen] = useState("date")
  const {hasBooking} = useDb();

  useEffect(()=>{
    if(hasBooking){setModalScreen("warning")}
  }, [hasBooking])

  function removeWarning(){
    setModalScreen("date")
  }

  return (
    <div className="page">
      <Header/>
      <main className="page-content">
        {modalScreen === "loading" ? null :
        !modalScreen ? <BookingCarousel/> :
        <div className="modal-container">
          <div className="modal">
            {modalScreen === "date" ?
            <SetDatesModal setModalScreen={setModalScreen}/> :
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
