import React from 'react'
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router';

export default function RequireBirdPathSet({children}) {
    const [loading, setLoading] = useState(true);
    const [hasBirdPath, setHasBirdPath] = useState("init")
    const {currentUser} = useAuth();

    useEffect(()=>{
        async function checkIfBirdPath(){
            const docRef = doc(db, "birdpaths", currentUser.uid);
            console.log(currentUser.uid)
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){setHasBirdPath(true)}
            else{setHasBirdPath(false)}
            setLoading(false);
        }

        checkIfBirdPath();

    }, [currentUser])

    return(<>
        {loading ? null :
        hasBirdPath ? children :  <Navigate to="/set-bird-path"/>}
        </>
    )
}
