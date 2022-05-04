import styled from 'styled-components'

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 101;
    background-color: rgba(0,0,0,0.5);
`
const EditBookingForm = styled.div`
    width: 40vw;
    gap: 10px;
    padding: 2% 0;
    display: flex;
    flex-wrap: wrap;
    > * {
        flex-basis: 100%;
    }   
`

export {Overlay, EditBookingForm}