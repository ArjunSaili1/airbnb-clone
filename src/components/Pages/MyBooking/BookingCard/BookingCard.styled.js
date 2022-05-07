import { motion } from 'framer-motion'
import styled from 'styled-components'

const BookingCardWrapper = styled(motion.div)`
    position: relative;
    z-index: 1;
    border-radius: 10px;
    display: flex;
    gap: 2%;
    width: 80vw;
    flex-wrap: wrap;

    @media (max-width: 650px){
        width: 85vw !important;
    }
`

const BookingCardMain = styled.div`
    padding: 3% 20px;
    gap: 10px;
    display: flex;
    flex-flow: column;
    word-wrap:break-word;
    max-width: 100%;
    min-width: 300px;
    height: 100%;
    width: 100%;
    flex: 1 0 50%;
`
const BookingImage = styled.img`
    max-width: 100%;
    min-width: 250px;
    flex: 1 1 230px;
    border-radius: 10px;
    height: auto;
`

const BookingCardFooter = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    height: 5em;

    @media (max-width: 450px){
        height: auto !important;
        margin: 0 !important;
    }
`

export {BookingCardWrapper, BookingCardMain, BookingImage, BookingCardFooter}