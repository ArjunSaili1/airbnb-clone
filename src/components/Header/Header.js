import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';
import { StyledHeader } from './Header.styled';
import { AnimatePresence } from 'framer-motion';
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
        text: "Book A Home",
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
                <Link to="/my-booking"><h1>Birdhouse</h1></Link>
                {mediaQuery ?  <MenuIcon onClick={()=>{setShowMobileMenu(!showMobileMenu)}}/> :
                <>
                    {navLinks.map(({text, nav})=> <Link key={text} to={nav}>{text}</Link>)}
                    <button onClick={signOutUser}><LogoutIcon/></button>
                </>
                }
            </StyledHeader>
            <AnimatePresence>
            {showMobileMenu ?
                <MobileMenu
                 key="mobile-side-menu"
                 exit={{opacity: 0}}
                 navLinks={navLinks} 
                 hide={()=>{setShowMobileMenu(false)}}/> 
            : null}
            </AnimatePresence>

        </>
    )
}
