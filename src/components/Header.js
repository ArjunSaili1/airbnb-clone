import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router'

export default function Header() {
    
    const {signOutUser} = useAuth()
    let navigate = useNavigate();

    function goBookings(){
        navigate("/bookings")
    }

    function goBirdPath(){
        navigate("/set-bird-path")
    }

    function goUpdateAccount(){
        navigate("/update-profile")
    }
    
    return (
        <header className="header">
            <h1 className="header-btn" onClick={goBookings}>Birdhouse</h1>
            <h4 className="header-btn" onClick={goBirdPath}>Bird Path</h4>
            <h4 className="header-btn" onClick={goBookings}>Bookings</h4>
            <h4 className="header-btn" onClick={goUpdateAccount}>Update Profile</h4>
            <button className="header-btn" onClick={signOutUser}>Sign out</button>
        </header>
    )
}
