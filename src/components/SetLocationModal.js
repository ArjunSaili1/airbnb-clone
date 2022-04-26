import React from 'react'
import { useState, useRef } from 'react'
import { useDb } from '../contexts/DatabaseContext';

export default function SetLocationModal({setModalScreen}) {

    const [loading, setLoading] = useState(false);
    const locationRef = useRef(null)
    const { addLocation } = useDb()

    async function handleSetLocation(e){
        e.preventDefault()
        setLoading(true)
        await addLocation(locationRef.current.value)
        setLoading(false)
        setModalScreen(false)
      }

    return (
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
