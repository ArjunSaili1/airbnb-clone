import React, { useRef } from 'react'
import useAccount from '../../../hooks/useAccount';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import {Modal, ModalWrapper, ModalHeader, Button, AuthFormField} from '../../SharedStyles'

function SignUp() {

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const {error, loading, statusUpdate} = useAccount()
  const passwordConfirmRef = useRef(null);
  const { signUp } = useAuth();

  async function handleSignUp(e){
    e.preventDefault();
    statusUpdate({type: "error_reset"})
    if(passwordConfirmRef.current.value !== passwordRef.current.value){
      statusUpdate({type: "error", errorText: "Passwords are not the same"})
      return;
    }
    try{
      statusUpdate({type: "form_submit"})
      await signUp(emailRef.current.value, passwordRef.current.value, fullNameRef.current.value)
      statusUpdate({type: "auth_success"})
    }
    catch(error){
      statusUpdate({type: "error", code: error.code})
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
            submit
            style={{fontSize: "0.9em"}}
            disabled={loading}
            onClick={handleSignUp}>Sign up</Button>
          </div>
      </Modal>
    </ModalWrapper>
  )
}

export default SignUp