import React from 'react'
import Header from '../../Header/Header'
import { useDb } from '../../../contexts/DatabaseContext'
import BookingCard from './BookingCard/BookingCard'
import {Page, PageContent} from '../../SharedStyles'

export default function MyBooking() {

  const {bookingData} = useDb()

  return(
    <Page>
      <Header/>
      <PageContent animate={{opacity: 1}} initial={{opacity: 0}}>
      {!(Object.keys(bookingData).length === 0) ?
          <BookingCard bookingData={bookingData}/>
      : <h1>No Bookings Found</h1>}
      </PageContent>
    </Page>)
}
