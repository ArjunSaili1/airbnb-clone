import React from 'react'
import Header from './Header'
import { useDb } from '../contexts/DatabaseContext'
import BookingCard from './BookingCard'
import Page from '../styled/Page'
import PageContent from '../styled/PageContent'

export default function MyBooking() {

  const {bookingData} = useDb()

  return(
    <Page>
      <Header/>
      <PageContent>
      {!(Object.keys(bookingData).length === 0) ?
          <BookingCard bookingData={bookingData}/>
      : <h1>No Bookings Found</h1>}
      </PageContent>
    </Page>)
}
