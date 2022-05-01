import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router'
import LogoutIcon from '@mui/icons-material/Logout';

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
        <header className="header">
            <h1 className="header-btn" onClick={goMyBooking}>Birdhouse</h1>
            <h4 className="header-btn" onClick={goBookHome}>Book a home</h4>
            <h4 className="header-btn" onClick={goMyBooking}>My Booking</h4>
            <h4 className="header-btn" onClick={goUpdateAccount}>Update Profile</h4>
            <LogoutIcon className="header-btn" onClick={signOutUser}/>
        </header>
    )
}
