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
    width: 100vw;
    display: flex;
    height: 100%;
    padding: 0 2%;
    justify-content: space-between;
    align-items: center;s
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
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`

const StyledOptionInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;

    > div {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
`

const CarouselArrow = styled.button`
    z-index: 1000;
    color: var(--primary);
    
    > * {
        font-size: 2.5em !important;
    }
`

export {CarouselWrapper, Carousel, CarouselButtons, StyledOption, StyledOptionInfo, CarouselArrow}