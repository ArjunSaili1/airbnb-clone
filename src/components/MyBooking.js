import React from 'react'
import Header from './Header'
import { useDb } from '../contexts/DatabaseContext'
import BookingCard from './BookingCard'

export default function MyBooking() {

  const {bookingData} = useDb()

  return(
    <div className="page">
      <Header/>
      <div className="page-content">
      {!(Object.keys(bookingData).length === 0) ?
          <BookingCard bookingData={bookingData}/>
      : <h1>No Bookings Found</h1>}
      </div>
    </div>)
}
