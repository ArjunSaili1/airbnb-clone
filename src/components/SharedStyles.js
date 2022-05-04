import styled from 'styled-components'
import { motion } from 'framer-motion'

const AuthFormField = styled.div`
    display: flex;
    width: 60vmin;
    gap: 10px;
    flex-direction: column;

    > input{
        font-size: 1rem;
        padding: 1.6%;
        border-radius: 5px;
        border-width: 1px;
    }
`

const Button = styled.button`
    background-color: ${props => 
    props.submit ?  "#77dd77" : 
    props.cancel ? "#dc3545" : "#FFFFFF"};
    border: 1px solid #222222;
    border-radius: 10px;
    cursor: pointer;
    font-size: 0.8em;
    font-weight: 600;
    padding: 10px 15px;
    text-align: center;

    &:focus-visible {
        box-shadow: #222222 0 0 0 2px, rgba(255, 255, 255, 0.8) 0 0 0 4px;
        transition: box-shadow .2s;
    }

    &:active {
        background-color: #F7F7F7;
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
    display: flex;
    z-index: 300;
    gap: 1em;
    background-color: white;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border: 1px solid grey; 
    height: auto;
    border-radius: 5px;
    padding: 3%;
`

const ModalWrapper = styled.div`
    display: grid;
    position: absolute;
    width: 100%;
    top: 0;
    place-items: center;
    height: 100%;
`

const ModalHeader = styled(motion.div)`
    display: grid;
    place-items: center;
    font-weight: 500;
`

const Page =  styled.div`
    display: flex;
    flex-flow: column;
    height: 100vh;
`

const PageContent = styled(motion.main)`
    position: relative;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export {AuthFormField, Button, Modal, ModalWrapper, ModalHeader, Page, PageContent}