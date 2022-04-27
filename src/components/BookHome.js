import React from 'react'
import Header from './Header'
import { useState } from 'react'
import SetLocationModal from './SetLocationModal'
import SetDatesModal from './SetDatesModal'
import BookingCarousel from './BookingCarousel'

export default function BookHome() {

  const [modalScreen, setModalScreen] = useState("date")

  return (
    <div>
      <Header/>
      {!modalScreen ? <BookingCarousel/> :
      <div className="modal-container">
        <div className="modal">
          {modalScreen === "date" ?
          <SetDatesModal setModalScreen={setModalScreen}/> :
          modalScreen === "location" ? 
          <SetLocationModal setModalScreen={setModalScreen}/> :
          null}
        </div>
      </div>}
    </div>  )
}
