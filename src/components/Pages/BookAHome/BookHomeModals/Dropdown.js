import React, { useEffect, useRef } from 'react'
import { StyledDropdown, DropdownOption } from './BookHomeModal.styled'

export default function Dropdown({handleFocus, options, selectLocation, hidden, focusIndex}) {

    let optionsRef = useRef([])

    useEffect(()=>{
        optionsRef.current = optionsRef.current.slice(0, options.length)
        optionsRef.current.forEach((option, index)=>{
            if(index === focusIndex){
                option.focus()
            }
        })
    }, [options, focusIndex])

    return (
        <div onKeyDown={handleFocus}
        style={{ visibility: `${hidden ? "hidden" : "visible"}`, width: "100%"}}>
            <StyledDropdown>
                {options ? options.map((name, index)=>{
                    return <DropdownOption
                    tabIndex={index + 1}
                    ref={el => optionsRef.current[index] = el}
                    onClick={selectLocation} 
                    onFocus={selectLocation}
                    key={name}>{name}</DropdownOption>
                }) : null}
            </StyledDropdown>
        </div>
    )
}
