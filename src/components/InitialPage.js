import React from 'react'
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import Bookings from './Bookings';
import { useAuth } from '../contexts/AuthContext';
import SetUpBirdPath from './SetUpBirdPath';


export default function InitialPage() {

    const [renderPage, setRenderPage] = useState(false)
    const {currentUser} = useAuth();


    useEffect(()=>{
        async function checkIfBirdPath(){
            const docRef = doc(db, "birdpaths", currentUser.uid);
            console.log(currentUser.uid)
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){setRenderPage("bookings")}
            else{setRenderPage("birdpaths")}
        }

        checkIfBirdPath();

    }, [currentUser])

    return(<>
        {!renderPage ? null :
        renderPage === "bookings" ? <Bookings/> :
        renderPage === "birdpaths" ? <SetUpBirdPath/> :
        <h1>An Error Has Occured</h1>}
        </>
    )
 }