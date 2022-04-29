import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { useDb } from '../contexts/DatabaseContext';

export default function SetLocationModal({setModalScreen}) {

    const [loading, setLoading] = useState(false);
    const [locationNames, setLocationNames] = useState([])
    const [dbLocationNames, setDbLocationNames] = useState([])
    const [hidden, setHidden] = useState(true);
    const [error, setError] = useState(null);
    const locationRef = useRef(null)
    const { addData, getLocationNames } = useDb()
    
    useEffect(()=>{
        async function setNames(){
            const names = await getLocationNames()
            setDbLocationNames(names)
        }
        setNames()
    }, [getLocationNames])

    async function handleSetLocation(e){
        e.preventDefault()
        if(dbLocationNames.indexOf(locationRef.current.value) === -1){
            setError("Sorry! We don't have any homes here.");
            return;
        }
        setLoading(true)
        await addData({city: locationRef.current.value})
        setLoading(false)
        setModalScreen(false)
    }

    function selectOptionFromDropdown(e){
        locationRef.current.value = e.target.textContent;
        setHidden(true)
    }

    function autocompleteLocations(e){
        let tempLocations = []
        setLocationNames([]);
        const locationInput = locationRef.current.value.replace(/\s+/g, '')
        if(locationRef.current.value !== ''){
            setHidden(false);
            dbLocationNames.forEach((name)=>{
                if(tempLocations.indexOf(name) === -1 && 
                name.toUpperCase().includes(locationInput.toUpperCase())){
                    tempLocations.push(name)
                }
            })   
        }
        if(tempLocations.length < 1){setHidden(true)}
        setLocationNames(tempLocations)
    }

    return (
    <>
        <div className="modal-header">
            <h3>Where will you be travelling?</h3>
            <h6 className="location-error">{error}</h6>
        </div>
        <form onSubmit={handleSetLocation}className="set-location-form">
            <div className="location-input-field">
                <input placeholder="Toronto" 
                onChange={autocompleteLocations} 
                ref={locationRef} type="text" 
                required className="location-input"></input>
                <div style={hidden ? {opacity: "0"}: {opacity: "100"}}
                className="autocomplete-dropdown">
                    <div className="dropdown-list">
                        {locationNames.map((name)=>{
                            return <button className="dropdown-option"
                            onClick={selectOptionFromDropdown} 
                            key={name}>{name}</button>
                        })}
                    </div>
                </div>
            </div>
            <button className="submit-location" 
            disabled={loading} type="submit">See Avaliable Homes</button>
        </form>
    </>
    )
}
