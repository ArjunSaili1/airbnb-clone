import React from 'react'
import Header from './Header'

export default function BookHome() {

  return (
    <div>
      <Header/>
      <div className="modal-container" style={{position: "absolute", top: "0", width: "100%"}}>
        <div className="modal">
          <div className="modal-header">
            <h3>When will you be travelling?</h3>
          </div>
          <form>
            <label htmlFor="check-in-date">Check In:</label>
            <input type="date"></input>
            <label htmlFor="check-out-date">Check Out:</label>
            <input type="date"></input>
          </form>
        </div>
      </div>
    </div>
  )
}
