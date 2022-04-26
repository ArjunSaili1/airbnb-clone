import React from 'react'
import Header from './Header'
import { useDb } from '../contexts/DatabaseContext'
import { useState, useRef } from 'react'

export default function BookHome() {

  const { addDate, addLocation } = useDb();
  const locationRef = useRef(null)
  const [showModal, setShowModal] = useState(true)
  const [modalScreen, setModalScreen] = useState("date")
  const [checkInDate, setCheckInDate] = useState(new Date().toLocaleDateString('en-ca'));
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSetDate(e){
    e.preventDefault()
    setLoading(true)
    await addDate(checkInDate, checkOutDate);
    setLoading(false)
    setModalScreen("location")
  }

  async function handleSetLocation(e){
    e.preventDefault()
    setLoading(true)
    await addLocation(locationRef.current.value)
    setLoading(false)
    setShowModal(false)
  }

  function resetDates(){
    setCheckInDate(new Date().toLocaleDateString('en-ca'))
    setCheckOutDate(null)
  }

  function showModalScreen(){
    if(modalScreen === "date"){
      return(
        <>
          <div className="modal-header">
            <h3>When will you be travelling?</h3>
          </div>
          <form onSubmit={handleSetDate} className="set-booking-form">
            <div className="set-booking-date">
              <div className="date-set-field">
                <label htmlFor="check-in-date"> Check In:</label>
                <input min={new Date().toLocaleDateString('en-ca')} 
                onChange={(e)=>{setCheckInDate(e.target.value)}}
                max={checkOutDate}
                required type="date"></input>
              </div>
              <div className="date-set-field">
                <label htmlFor="check-out-date">Check Out:</label>
                <input min={checkInDate}
                onChange={(e)=>{setCheckOutDate(e.target.value)}}
                required type="date"></input>
              </div>
            </div>
            <div className="date-modal-btns">
              <button onClick={resetDates} type="button" className="reset-date">Reset</button>
              <button disabled={loading} type="submit" className="submit-date">Next</button>
            </div>
          </form>
      </>)
    }
    if(modalScreen === "location"){
      return(
        <>
          <div className="modal-header">
            <h3>Where will you be travelling?</h3>
          </div>
          <form onSubmit={handleSetLocation}className="set-location-form">
            <label htmlFor="location">Enter a location</label>
            <input ref={locationRef} type="text"></input>
            <button disabled={loading} type="submit">See Avaliable Homes</button>
          </form>
        </>
      )
    }
  }

  return (
    <div>
      <Header/>
      {showModal ? 
      <div className="modal-container">
        <div className="modal">
          {showModalScreen()}
        </div>
      </div>
      :null}
    </div>  )
}
