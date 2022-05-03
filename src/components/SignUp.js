import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ModalWrapper from '../styled/ModalWrapper';
import Modal from '../styled/Modal';
import ModalHeader from '../styled/ModalHeader';

function SignUp() {

  const fullNameRef = useRef(null);
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
      signUp(emailRef.current.value, passwordRef.current.value, fullNameRef.current.value)
    }catch(error){
      setError(error.code)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <ModalWrapper>
        <Modal>
          <ModalHeader>
            <h1 className="modal-title">Sign Up</h1>
            <h5 className="redirect-text">Already have an account? <Link to="/login">Login</Link></h5>
            {error ? <h5 className="error">{error}</h5> : null}
          </ModalHeader>
          <div className="form-field">
            <label htmlFor="first-name">Full Name</label>
            <input placeholder="John Smith" ref={fullNameRef} type="text"></input>
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input placeholder="example@email.com" 
            ref={emailRef} className="email" autoComplete="on" type="email"></input>
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input ref={passwordRef} className="password" autoComplete="on" type="password"></input>
          </div>
          <div className="form-field">
            <label htmlFor="password confirm">Re-enter Password</label>
            <input ref={passwordConfirmRef} className="password" autoComplete="on" type="password"></input> 
          </div>
          <div className="submit-button">
            <button 
            disabled={loading} 
            onClick={handleSignUp}>Sign up</button>
          </div>
      </Modal>
    </ModalWrapper>
  )
}

export default SignUp