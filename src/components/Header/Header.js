import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router'
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
    let navigate = useNavigate();
    const [showMobileMenu, setShowMobileMenu] = useState(false)

    function goMyBooking(){
        navigate("/my-booking")
    }

    function goBookHome(){
        navigate("/book-home")
    }

    function goUpdateAccount(){
        navigate("/update-profile")
    }
    
    return (
        <>
            <StyledHeader>
                <h1 style={{cursor: "pointer"}} onClick={goMyBooking}>Birdhouse</h1>
                {mediaQuery ?  <MenuIcon onClick={()=>{setShowMobileMenu(!showMobileMenu)}}/> :
                <>
                    <h4 style={{cursor: "pointer"}} onClick={goBookHome}>Book a home</h4>
                    <h4 style={{cursor: "pointer"}} onClick={goMyBooking}>My Booking</h4>
                    <h4 style={{cursor: "pointer"}} onClick={goUpdateAccount}>Update Profile</h4>
                    <LogoutIcon style={{cursor: "pointer"}} onClick={signOutUser}/>
                </>
                }
            </StyledHeader>
            {showMobileMenu ? <MobileMenu hide={()=>{setShowMobileMenu(false)}}/> : null}
        </>
    )
}
