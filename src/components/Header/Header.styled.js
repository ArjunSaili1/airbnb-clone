import styled from 'styled-components'
import { motion } from 'framer-motion'

const StyledHeader = styled.header`
  z-index: 100;
  flex: 0 1 auto;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 1vmax;
  width: 100%;
  background-color: var(--dark);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  > *{
    color: var(--primary)
  }

  Link{
    font-weight: 500;
  }

  > Link:hover{
    filter: brightness(0.97)
  }

  > Link:active{
    filter: brightness(0.85)
  }
`

const MobileMenuContainer = styled(motion.span)`
  position: relative;
`

const StyledMobileMenu = styled(motion.div)`
  position: fixed;
  right: 0;
  z-index: 500;
  background-color: var(--background);
  width: 430px;
  height: 100%;
  display: flex;
  padding: 50px;
  gap: 50px;
  flex-direction: column;

  svg{
    color: var(--secondary);
  }

  > *{
    width: fit-content;
    font-weight: 500;
    display: flex;
    gap: 10px;
    align-items: center;
    font-size: 1.2em;
  }

  h4{
    color: var(--primary);
  }

  @media (max-width: 430px){
    width: 100% !important;
  }
`

export {StyledHeader, StyledMobileMenu, MobileMenuContainer}