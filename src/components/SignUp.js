import React, { useRef, useState } from 'react'
import { setDoc, doc } from '@firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

function SignUp() {

  const fullNameRef = useRef(null);
  const cityRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  async function handleSignUp(e){
    e.preventDefault();
    setError('');
    if(passwordConfirmRef.current.value !== passwordRef.current.value){
      setError("Passwords are not the same")
      return;
    }
    try{
      setLoading(true)
      const userCredential = await signUp(emailRef.current.value, passwordRef.current.value)
      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: fullNameRef.current.value,
        city: cityRef.current.value,
        emailRef: emailRef.current.value,
        birdpath: []
      })
    }catch(error){
      setError(error.code)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="modal-container">
        <form className="modal">
          <div className="modal-header">
            <h1 className="modal-title">Sign Up</h1>
            <h5 className="redirect-text">Already have an account? <Link to="/login">Login</Link></h5>
            {error ? <h5 className="error">{error}</h5> : null}
          </div>
          <div className="form-field">
            <label htmlFor="first-name">Full Name</label>
            <input placeholder="John Smith" ref={fullNameRef} type="text"></input>
          </div>
          <div className="form-field">
            <label htmlFor="city">City</label>
            <input placeholder="Toronto" ref={cityRef} type="text"></input>
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input placeholder="example@email.com" 
            ref={emailRef} className="email" type="email"></input>
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input ref={passwordRef} className="password" type="password"></input>
          </div>
          <div className="form-field">
            <label htmlFor="password confirm">Re-enter Password</label>
            <input ref={passwordConfirmRef} className="password" type="password"></input> 
          </div>
          <div className="submit-button">
            <button 
            disabled={loading} 
            onClick={handleSignUp}>Sign up</button>
          </div>
      </form>
    </div>
  )
}

export default SignUp