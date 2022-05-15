import React from 'react'
import Header from '../../Header/Header'
import useDb from '../../../hooks/useDb'
import BookingCard from './BookingCard/BookingCard'
import {Page, PageContent} from '../../SharedStyles'
import { AnimatePresence, motion } from 'framer-motion'

export default function MyBooking() {

  const {bookingData} = useDb()

  return(
    <Page>
      <Header/>
        <PageContent>
          <AnimatePresence exitBeforeEnter>
            {!(Object.keys(bookingData).length === 0) ?
                <BookingCard key="booking-card" bookingData={bookingData}/>
            : <motion.h1 key="no-bookings" 
            initial={{opacity: 0}} 
            animate={{opacity: 1}} 
            exit={{opacity: 0}}>No Bookings Found</motion.h1>}
          </AnimatePresence>
        </PageContent>
    </Page>)
}
