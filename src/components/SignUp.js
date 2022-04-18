import React, { useRef } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from '@firebase/auth';

function SignUp() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function signUpUser(e){
    e.preventDefault();
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userCredential)=>{
        console.log(userCredential)
      })
  }

  return (
    <div>
        <h1>Sign Up</h1>
        <label>Email</label>
        <input ref={emailRef} className="email" type="email"></input>
        <label>Password</label>
        <input ref={passwordRef} className="password" type="password"></input>
        <button onClick={signUpUser}>Submit</button>
    </div>
  )
}

export default SignUp