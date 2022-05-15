import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';

export default function RequireAuth({children}) {
    
    const {currentUser} = useAuth()
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        }, 500)
    }, [])

    return loading ? null : 
    currentUser ? children : 
    <Navigate to="/login"/>
}
