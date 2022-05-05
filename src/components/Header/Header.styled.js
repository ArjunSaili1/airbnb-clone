import styled from 'styled-components'

const StyledHeader = styled.header`
  z-index: 100;
  flex: 0 1 auto;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 2vmax;
  width: 100%;
  background-color: var(--dark);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

  > *{
    color: var(--primary)
  }

  a{
    font-weight: 500;
  }

  > a:hover{
    filter: brightness(0.97)
  }

  > a:active{
    filter: brightness(0.85)
  }
`

const MobileMenuContainer = styled.span`
  position: relative;
`

const StyledMobileMenu = styled.div`
  position: fixed;
  right: 0;
  z-index: 500;
  background-color: var(--background);
  width: 430px;
  height: 100%;

  @media (max-width: 430px){
    width: 100% !important;
  }
`

export {StyledHeader, StyledMobileMenu, MobileMenuContainer}