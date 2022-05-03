import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef } from 'react'
import { useDb } from '../contexts/DatabaseContext';
import Button from '../styled/Button';
import ModalHeader from '../styled/ModalHeader';

export default function SetLocationModal({setModalScreen}) {

    const [autocomplete, setAutocomplete] = useState([])
    const [locationNames, setLocationNames] = useState([])
    const [hidden, setHidden] = useState(true);
    const [error, setError] = useState(null);
    const locationRef = useRef(null)
    const { addQuery, getLocationNames } = useDb()
    
    useEffect(()=>{
        async function setNames(){
            const names = await getLocationNames()
            setLocationNames(names)
        }
        setNames()
    }, [getLocationNames])

    function handleSetLocation(e){
        e.preventDefault()
        if(locationNames.indexOf(locationRef.current.value) === -1){
            setError("Sorry! We don't have any homes here.");
            return;
        }
        addQuery(locationRef.current.value)
        setModalScreen(false)
    }

    function selectOptionFromDropdown(e){
        locationRef.current.value = e.target.textContent;
        setHidden(true)
    }

    function autocompleteLocations(e){
        const temp = [];
        const locationInput = locationRef.current.value.replace(/\s+/g, '')
        if(locationRef.current.value !== ''){
            setHidden(false);
            locationNames.forEach((name)=>{
                if(temp.indexOf(name) === -1 && 
                name.toUpperCase().includes(locationInput.toUpperCase())){
                    temp.push(name)
                }
            })   
        }
        if(temp.length < 1){setHidden(true)}
        setAutocomplete(temp)
    }

    return (
    <>
        <ModalHeader animate={{opacity: 1}} initial={{opacity: 0}}>
            <h3>Where will you be travelling?</h3>
            <h6 className="location-error">{error}</h6>
        </ModalHeader>
        <motion.form 
        animate={{opacity: 1}} initial={{opacity: 0}}
        onSubmit={handleSetLocation}className="set-location-form">
            <div className="location-input-field">
                <input placeholder="Toronto" 
                onChange={autocompleteLocations} 
                ref={locationRef} type="text" 
                required className="location-input"></input>
                <div style={hidden ? {opacity: "0"}: {opacity: "100"}}
                className="autocomplete-dropdown">
                    <div className="dropdown-list">
                        {autocomplete.map((name)=>{
                            return <button className="dropdown-option"
                            onClick={selectOptionFromDropdown} 
                            key={name}>{name}</button>
                        })}
                    </div>
                </div>
            </div>
            <Button type="submit">See Avaliable Homes</Button>
        </motion.form>
    </>
    )
}
