import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router';

export default function RequireNotUser({children}) {
    const {currentUser} = useAuth();
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        }, 500)
    }, [])

    return loading ? null : 
    !currentUser ? children : 
    <Navigate to="/my-booking"/>
}
