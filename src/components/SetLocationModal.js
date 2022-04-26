import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { useDb } from '../contexts/DatabaseContext';

export default function SetLocationModal({setModalScreen}) {

    const [loading, setLoading] = useState(false);
    const [locationNames, setLocationNames] = useState([])
    const [dbLocationNames, setDbLocationNames] = useState([])
    const [hidden, setHidden] = useState(true);
    const locationRef = useRef(null)
    const { addLocation, getLocationNames } = useDb()
    
    useEffect(()=>{
        async function setNames(){
            const names = await getLocationNames()
            setDbLocationNames(names)
        }
        setNames()
    }, [getLocationNames])

    async function handleSetLocation(e){
        e.preventDefault()
        setLoading(true)
        await addLocation(locationRef.current.value)
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
        if(locationRef.current.value !== ''){
            setHidden(false);
            dbLocationNames.forEach((name)=>{
                if(name.toUpperCase().includes(locationRef.current.value.replace(/\s+/g, '').toUpperCase())){
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
        </div>
        <form onSubmit={handleSetLocation}className="set-location-form">
            <label htmlFor="location">Enter a location</label>
            <div className="location-input-field">
                <input onChange={autocompleteLocations} 
                ref={locationRef} type="text" 
                className="location-input"></input>
                <div style={hidden ? {opacity: "0"}: {opacity: "100"}}
                className="autocomplete-dropdown">
                    <ul className="dropdown-list">
                        {locationNames.map((name)=>{
                            return <li className="dropdown-option"
                            onClick={selectOptionFromDropdown} 
                            key={name}>{name}</li>
                        })}
                    </ul>
                </div>
            </div>
            <button className="submit-location" 
            disabled={loading} type="submit">See Avaliable Homes</button>
        </form>
    </>
    )
}
