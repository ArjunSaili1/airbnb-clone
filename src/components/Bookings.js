import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router';
import { useDb } from '../contexts/DatabaseContext';
import Header from './Header'

export default function Bookings() {
  const [loading, setLoading] = useState(true);
  const [hasBooked, setHasBooked] = useState("init")
  const {bookingExists} = useDb();
  const navigate = useNavigate()

  useEffect(()=>{
      async function checkIfBooked(){
          const {booking} = await bookingExists();
          if(booking){setHasBooked(true)}
          else{setHasBooked(false)}
          setLoading(false)
      }
      checkIfBooked();
  }, [bookingExists])

  return(<>
    {
    loading ? null :
    hasBooked ?
      <div className="page">
        <Header/>
        <div className="page-content">
          <h1>Bookings</h1>
        </div>
      </div>
    : navigate("/book-home")}
    </>
  )
}
