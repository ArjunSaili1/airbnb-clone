import styled from 'styled-components'
import { motion } from 'framer-motion'

const CarouselWrapper = styled.div`
    width: 100vw;
    height: 100%;
    top: 2vh;
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
    height: 100%;
    display: flex;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    align-items: center;
    position: relative;

    > button{
        margin: 20px;
        position: absolute;
    }
`
const StyledOption = styled(motion.article)`
    height: fit-content;
    width: 35vmax;
    background-color: white;
    position: absolute;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 10px;
    padding: 1em;
    align-items: center;
    background-color: var(--secondary);
`

const CarouselArrow = styled.button`
    z-index: 1000;
    left: ${props => props.left ? -10 : 0};
    right: ${props => props.right ? -10 : 0};

    > * {
        font-size: "3em";
        color: var(--primary);  
    }
`

export {CarouselWrapper, Carousel, CarouselButtons, StyledOption, CarouselArrow}