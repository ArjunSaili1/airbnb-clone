import React, { useEffect, useState } from 'react'
import Header from '../../Header/Header'
import {Modal, ModalWrapper, Page, PageContent} from '../../SharedStyles'
import SetLocationModal from './BookHomeModals/SetLocationModal'
import SetDatesModal from './BookHomeModals/SetDatesModal'
import BookingWarning from './BookHomeModals/BookingWarning'
import BookingCarousel from './BookingCarousel/BookingCarousel'
import useDb from '../../../hooks/useDb'
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
    const bookingValid = 
      bookingData["checkIn"] && 
      bookingData["checkOut"] && 
      bookingData["locationId"]

    if(bookingValid &&!newBooking){setModalScreen("warning")}
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
    <Page>
      <Header/>
      <PageContent animate={{opacity: 1}} initial={{opacity: 0}}>
        {modalScreen === "loading" ? null :
        !modalScreen ? <BookingCarousel loading={loading} setLocation={setLocation}/> :
        <ModalWrapper>
          <Modal>
            {modalScreen === "date" ?
            <SetDatesModal setCheckIn={setCheckIn} setCheckOut={setCheckOut} setModalScreen={setModalScreen}/>
            : modalScreen === "location" ? 
            <SetLocationModal setModalScreen={setModalScreen}/> :
            modalScreen === "warning" ?
            <BookingWarning removeWarning={removeWarning}/> :
            null}
          </Modal>
        </ModalWrapper>}
      </PageContent>
    </Page>)
}
