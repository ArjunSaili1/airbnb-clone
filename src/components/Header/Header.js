import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import LogoutIcon from '@mui/icons-material/Logout';
import { StyledHeader } from './Header.styled';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MobileMenu from './MobileMenu';

export default function Header() {
    
    const theme = useTheme()
    const mediaQuery = useMediaQuery(theme.breakpoints.down('sm'));
    const {signOutUser} = useAuth()
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const navLinks = [{
        text: "Book a home",
        nav: "/book-home"
    },
    {
        text: "My Booking",
        nav: "/my-booking"
    },
    {
        text: "Update Profile",
        nav: "/update-profile"
    }]
    
    return (
        <>
            <StyledHeader>
                <a href="/my-booking"><h1>Birdhouse</h1></a>
                {mediaQuery ?  <MenuIcon onClick={()=>{setShowMobileMenu(!showMobileMenu)}}/> :
                <>
                    {navLinks.map(({text, nav})=> <a href={nav}onClick={nav}>{text}</a>)}
                    <button onClick={signOutUser}><LogoutIcon/></button>
                </>
                }
            </StyledHeader>
            {showMobileMenu ? <MobileMenu hide={()=>{setShowMobileMenu(false)}}/> : null}
        </>
    )
}
