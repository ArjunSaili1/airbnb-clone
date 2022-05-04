import styled from 'styled-components'
import { motion } from 'framer-motion'

const BookingDateForm =  styled(motion.form)`
    display: flex;
    flex-direction: column;
    gap: 2em;
`

const BookingDateFormMain = styled.div`
    display: flex;
    width: 100%;
    gap: 3em;
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
    gap: 2.5em;
    align-items: center;
`

const LocationInput = styled.input`
    font-size: 1rem;
    width: 100%;
    padding: 10px;
`

const Dropdown = styled.div`
    position: absolute;
    background-color: white;
    width: 100%;
    border: 1px solid black;
    list-style: none;
`

const DropdownOption = styled.div`
    padding: 0.5em;
    cursor: pointer;
    font-size: 0.75em;
    width: 100%;
    text-align: start;
    background-color: unset;
    border: 0;
    cursor: pointer;
`

export {BookingDateForm, BookingDateFormMain, BookingDateFormField, LocationForm, LocationInput, Dropdown, DropdownOption}