import styled from 'styled-components'

const BookingCardWrapper = styled.div`
    position: relative;
    z-index: 1;
    border-radius: 10px;
    display: flex;
    gap: 2%;
    width: 65vw;
    flex-wrap: wrap;
`

const BookingCardMain = styled.div`
    padding: 3% 2%;
    display: flex;
    flex-flow: column;
    word-wrap:break-word;
    min-width: 150px;
    max-width: 100%;
    width: 100%;
    gap: 10px;
    flex: 1 0 40vw;
`
const BookingImage = styled.img`
    min-width: 200px;
    flex: 1 1 15vh;
    border-radius: 10px;
    height: auto;
`

const BookingCardFooter = styled.div`
    position: relative;
    height: 100%;
    padding: 10px 0;
    margin: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
`

export {BookingCardWrapper, BookingCardMain, BookingImage, BookingCardFooter}