import React, { useEffect, useState, useRef } from 'react'
import { useDb } from '../contexts/DatabaseContext';
import Button from '../styled/Button';
import ModalHeader from '../styled/ModalHeader';
import LocationForm from '../styled/LocationForm';
import LocationInput from '../styled/LocationInput';
import Dropdown from '../styled/Dropdown';
import DropdownOption from '../styled/DropdownOption';

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
            <h6 style={{height: "1rem",
                        padding: "5px",
                        color: "red"}}>{error}</h6>
        </ModalHeader>
        <LocationForm
        animate={{opacity: 1}} 
        initial={{opacity: 0}}
        onSubmit={handleSetLocation}>
            <div style={{position: "relative", width: "80%"}}>
                <LocationInput placeholder="Toronto" 
                onChange={autocompleteLocations} 
                ref={locationRef} type="text" 
                required></LocationInput>
                <div style={{
                 opacity: `${hidden ? "0" : "100"}`,
                 width: "100%",
                 height: "1rem"}}>
                    <Dropdown>
                        {autocomplete.map((name)=>{
                            return <DropdownOption
                            onClick={selectOptionFromDropdown} 
                            key={name}>{name}</DropdownOption>
                        })}
                    </Dropdown>
                </div>
            </div>
            <Button type="submit">See Avaliable Homes</Button>
        </LocationForm>
    </>
    )
}
