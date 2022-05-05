import React from 'react'
import { Overlay } from '../SharedStyles'
import { StyledMobileMenu, MobileMenuContainer } from './Header.styled'
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function getIcon(text){
    if(text === "Book A Home"){return <HomeIcon/>}
    if(text === "My Booking"){return <CalendarMonthIcon/>}
    if(text === "Update Profile"){return <ManageAccountsIcon/>}
}

export default function MobileMenu({hide, navLinks}) {
  return (
    <MobileMenuContainer>
      <Overlay onClick={hide} style={{zIndex: "300"}}></Overlay>
      <StyledMobileMenu>
          {navLinks.map(({text, nav})=>
          <a href={nav} key={text}>
            {getIcon(text)}
            <h4>{text}</h4>
          </a>)}
      </StyledMobileMenu>
    </MobileMenuContainer>
  )
}
