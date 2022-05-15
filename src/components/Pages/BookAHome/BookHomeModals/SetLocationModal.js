import React, { useEffect, useState, useRef } from 'react'
import useDb from '../../../../hooks/useDb';
import {Button, ModalHeader} from '../../../SharedStyles'
import Dropdown from './Dropdown';
import { LocationForm, LocationInput } from './BookHomeModal.styled';

export default function SetLocationModal({setModalScreen}) {

    const [autocomplete, setAutocomplete] = useState([])
    const [locationNames, setLocationNames] = useState([])
    const [hidden, setHidden] = useState(true);
    const [error, setError] = useState(null);
    const [focusIndex, setFocusIndex] = useState(-1);
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

    function selectLocation(e){
        locationRef.current.value = e.target.textContent;
    }

    function autocompleteLocations(){
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

    function handleFocus(e){
        if(e.key === "ArrowDown" && focusIndex < autocomplete.length - 1){
            locationRef.current.blur()  
            setFocusIndex(focusIndex + 1)
        }
        if(e.key === "ArrowUp" && focusIndex > -1){
            if(focusIndex === 0){locationRef.current.focus()}
            setFocusIndex(focusIndex - 1)
        }
    }

    function handleCloseDropdown(e){
        if(e.target.tagName !== "INPUT"){
            setHidden(true)
        }
    }

    return (
    <div onClick={handleCloseDropdown}>
        <ModalHeader animate={{opacity: 1}} initial={{opacity: 0}}>
            <h3>Where will you be travelling?</h3>
            <h6 style={{height: "1rem",
                        padding: "5px",
                        color: "red"}}>{error}</h6>
        </ModalHeader>
        <LocationForm
        animate={{opacity: 1}} 
        initial={{opacity: 0}}
        onSubmit={handleSetLocation}>
            <div style={{position: "relative", width: "80%"}}>
                <LocationInput 
                tabIndex="1"
                placeholder="Toronto" 
                onChange={autocompleteLocations}
                ref={locationRef} type="text" 
                onKeyDown={handleFocus}
                required></LocationInput>
                    <Dropdown handleFocus={handleFocus} focusIndex={focusIndex} hidden={hidden} options={autocomplete} selectLocation={selectLocation}/>
            </div>
            <Button submit type="submit">See Avaliable Homes</Button>
        </LocationForm>
    </div>
    )
}

