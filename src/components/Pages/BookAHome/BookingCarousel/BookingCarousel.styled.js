import styled from 'styled-components'
import { motion } from 'framer-motion'

const CarouselWrapper = styled.div`
    width: 100vw;
    height: 100%;
    overflow: hidden;
    display: flex;
    position: absolute;
    justify-content: center;
`

const Carousel = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const CarouselButtons = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    height: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 2%;
`
const StyledOption = styled(motion.article)`
    height: fit-content;
    width: 35vmax;
    background-color: white;
    position: absolute;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    align-items: center;
    background-color: var(--primary);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`

const StyledOptionInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;

    > div {
        display: flex;
        flex-direction: column;
        gap: 0.25em;
        margin-bottom: 0.5em;
    }
`

const CarouselArrow = styled.button`
    z-index: 1000;
    color: var(--secondary);
    position: relative;
    overflow: hidden;
    > * {
        font-size: 5em !important;
    } 
`

export {CarouselWrapper, Carousel, CarouselButtons, StyledOption, StyledOptionInfo, CarouselArrow}