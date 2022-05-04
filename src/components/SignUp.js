import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ModalWrapper from './sharedUI/ModalWrapper';
import Modal from './sharedUI/Modal';
import ModalHeader from './sharedUI/ModalHeader';
import Button from './sharedUI/Button';
import AuthFormField from './sharedUI/AuthFormField';

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
            <h1>Sign Up</h1>
            <h5 style={{margin: "10px 0"}}>Already have an account? <Link to="/login">Login</Link></h5>
            {error ? <h5 style={{color: "red"}}>{error}</h5> : null}
          </ModalHeader>
          <AuthFormField>
            <label htmlFor="first-name">Full Name</label>
            <input placeholder="John Smith" ref={fullNameRef} type="text"></input>
          </AuthFormField>
          <AuthFormField>
            <label htmlFor="email">Email</label>
            <input placeholder="example@email.com" 
            ref={emailRef} autoComplete="on" type="email"></input>
          </AuthFormField>
          <AuthFormField>
            <label htmlFor="password">Password</label>
            <input ref={passwordRef} autoComplete="on" type="password"></input>
          </AuthFormField>
          <AuthFormField>
            <label htmlFor="password confirm">Re-enter Password</label>
            <input ref={passwordConfirmRef} autoComplete="on" type="password"></input> 
          </AuthFormField>
          <div style={{
            display: "flex",
            justifyContent: "flex-end"
          }}>
            <Button 
            disabled={loading} 
            onClick={handleSignUp}>Sign up</Button>
          </div>
      </Modal>
    </ModalWrapper>
  )
}

export default SignUp