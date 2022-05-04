import React, { useEffect, useState } from 'react'
import Header from '../../Header/Header'
import Modal from '../../SharedStyles/Modal'
import ModalWrapper from '../../SharedStyles/ModalWrapper'
import SetLocationModal from './Modals/SetLocationModal'
import SetDatesModal from './Modals/SetDatesModal'
import BookingWarning from './BookingWarning'
import Page from '../../SharedStyles/Page'
import BookingCarousel from './BookingCarousel/BookingCarousel'
import { useDb } from '../../../contexts/DatabaseContext'
import { useNavigate } from 'react-router'
import PageContent from '../../SharedStyles/PageContent'

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
