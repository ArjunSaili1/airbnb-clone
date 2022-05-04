import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router'
import LogoutIcon from '@mui/icons-material/Logout';
import StyledHeader from '../../styled/StyledHeader';

export default function Header() {
    
    const {signOutUser} = useAuth()
    let navigate = useNavigate();

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
        <StyledHeader>
            <h1 style={{cursor: "pointer"}} onClick={goMyBooking}>Birdhouse</h1>
            <h4 style={{cursor: "pointer"}} onClick={goBookHome}>Book a home</h4>
            <h4 style={{cursor: "pointer"}} onClick={goMyBooking}>My Booking</h4>
            <h4 style={{cursor: "pointer"}} onClick={goUpdateAccount}>Update Profile</h4>
            <LogoutIcon style={{cursor: "pointer"}} onClick={signOutUser}/>
        </StyledHeader>
    )
}
