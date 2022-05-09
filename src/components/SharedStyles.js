import styled from 'styled-components'
import { motion } from 'framer-motion'

const AuthFormField = styled.div`
    display: flex;
    width: 60vmin;
    gap: 10px;
    flex-direction: column;

    @media (max-width: 430px){
        width: 90vw !important;
    }
`

const Overlay = styled(motion.div)`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 102;
    background-color: rgba(0,0,0,0.5);
`

const Button = styled.button`
    background-color: ${props => 
    props.submit ?  "#55D6BE" : 
    props.cancel ? "var(--primary)" : "#FFFFFF"};
    border: 1px solid var(--dark);
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.75em;
    font-weight: 600;
    padding: 9px;
    text-align: center;

    &:focus-visible {
        box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
        transition: box-shadow .2s;
    }

    &:hover{
        filter: brightness(0.97);
    }

    &:active {
        filter: brightness(0.9);
        border-color: #000000;
        transform: scale(.95);
    }

    &:disabled {
        border-color: #DDDDDD;
        color: #DDDDDD;
        cursor: not-allowed;
    }
`

const Modal = styled(motion.div)`
    min-width: 300px;
    max-width: 95vw;
    display: flex;
    z-index: 300;
    padding: 5% 40px;
    gap: 20px;
    background-color: white;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: auto;
    border-radius: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    background-color: var(--dark);

    >*{
        color: white;
    }
`

const ModalWrapper = styled.div`
    display: grid;
    position: absolute;
    width: 100%;
    top: 0;
    place-items: center;
    height: 95%;
    background-color: var(--background);    
`

const ModalHeader = styled(motion.div)`
    text-align: center;
    display: grid;
    place-items: center;
    font-weight: 500;
    > h1 { 
        margin: 0;
    }
`

const Page =  styled.div`
    display: flex;
    flex-flow: column;
    height: 100vh;
`

const PageContent = styled(motion.main)`
    position: relative;
    z-index: 200;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--background);    
`

export {AuthFormField, Overlay, Button, Modal, ModalWrapper, ModalHeader, Page, PageContent}