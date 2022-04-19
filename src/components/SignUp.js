import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';

function SignUp() {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const [error, setError] = useState(null);
  const { signUp } = useAuth();

  async function handleSignUp(e){
    e.preventDefault();
    setError('');
    if(passwordConfirmRef.current.value !== passwordRef.current.value){
      setError("Passwords are not the same")
      return;
    }
    try{
      await signUp(emailRef.current.value, passwordRef.current.value)
    }catch(error){
      setError(error.code)
    }
  }

  return (
    <div className="modal-container">
        <form className="modal">
          <h1>Sign Up</h1>
          <div>{error}</div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input ref={emailRef} className="email" type="email"></input>
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input ref={passwordRef} className="password" type="password"></input>
          </div>
          <div className="form-field">
            <label htmlFor="password confirm">Password Confirm</label>
            <input ref={passwordConfirmRef} className="password" type="password"></input> 
          </div>
          <div>
            <button onClick={handleSignUp}>Submit</button>
          </div>
      </form>
    </div>
  )
}

export default SignUp