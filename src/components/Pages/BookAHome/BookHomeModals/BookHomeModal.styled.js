import styled from 'styled-components'
import { motion } from 'framer-motion'

const BookingDateForm =  styled(motion.form)`
    display: flex;
    flex-direction: column;
    gap: 2em;
`

const BookingDateFormMain = styled.div`
    display: flex;
    max-width: 90%;
    gap: 1em;
    flex-direction: row;
`

const BookingDateFormField = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`

const LocationForm = styled(motion.form)`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1em;
    align-items: center;
`

const LocationInput = styled.input`
    font-size: 1rem;
    width: 100%;
    padding: 10px;
`

const StyledDropdown = styled.div`
    position: absolute;
    background-color: #FDFFFC;
    width: 100%;
    border: 1px solid black;
    border-width: 0 1px 1px 1px;
    border-radius: 0 0 10px 10px;
    list-style: none;
`

const DropdownOption = styled.button`
    display: inline-block;
    padding: 0.5em;
    cursor: pointer;
    font-size: 0.75em;
    width: 100%;
    text-align: start;
    background-color: inherit;
    border-radius: inherit;
    border: 0;
    cursor: pointer;
    :focus{
        filter: brightness(0.9);
    }
`

export {BookingDateForm, BookingDateFormMain, BookingDateFormField, LocationForm, LocationInput, StyledDropdown, DropdownOption}
