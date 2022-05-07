import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Overlay } from '../SharedStyles'
import LogoutIcon from '@mui/icons-material/Logout';
import { StyledMobileMenu, MobileMenuContainer } from './Header.styled'
import HomeIcon from '@mui/icons-material/Home';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function MobileMenu({hide, navLinks}) {

    const {signOutUser} = useAuth()

    function getIcon(text){
        if(text === "Book A Home"){return <HomeIcon/>}
        if(text === "My Booking"){return <CalendarMonthIcon/>}
        if(text === "Update Profile"){return <ManageAccountsIcon/>}
    }
    return (
    <MobileMenuContainer>
        <Overlay onClick={hide} style={{zIndex: "300"}}></Overlay>
        <StyledMobileMenu>
            {navLinks.map(({text, nav})=>
            <Link to={nav} key={text}>
            {getIcon(text)}
            <h4>{text}</h4>
            </Link>)}
            <button onClick={signOutUser}>
                <LogoutIcon/>
                <h4>Logout</h4>
            </button>
        </StyledMobileMenu>
    </MobileMenuContainer>
    )
}
