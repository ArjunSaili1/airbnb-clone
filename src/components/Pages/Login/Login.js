import React, { useRef } from 'react'
import { useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import useAccount from '../../../hooks/useAccount';
import { ModalHeader, Modal, ModalWrapper, Button, AuthFormField } from '../../SharedStyles';

function Login() {

  const emailRef = useRef(null);
  const nav = useNavigate()
  const passwordRef = useRef(null);
  const {error, loading, statusUpdate} = useAccount()
  const { login } = useAuth();

  function guestLogin(e){
    emailRef.current.value = "test@test.com";
    passwordRef.current.value = "password";
    handleLogin(e);
  }

  async function handleLogin(e){
    e.preventDefault();
    statusUpdate({type: "error_reset"});
    try{
      statusUpdate({type: "form_submit"})
      await login(emailRef.current.value, passwordRef.current.value)
      nav('/my-booking')
    }catch(error){
      statusUpdate({type: "error", code: error.code})
    }
  }

  return (
    <ModalWrapper>
        <Modal as="form" onSubmit={handleLogin}>
          <ModalHeader>
            <h1>Login</h1>
            <h5 style={{margin: "10px 0"}}>Don't have an account? <Link to="/signup">Sign up</Link></h5>
            {error ? <h5 style={{color: "red"}}>{error}</h5> : null}
          </ModalHeader>
          <AuthFormField>
            <label htmlFor="email">Email</label>
            <input tabIndex="1" ref={emailRef} autoComplete="on" type="email"></input>
            <h6 style={{fontWeight: "400"}}>
              Just Visiting? <span onClick={guestLogin} 
              style={{
                cursor: "pointer",
                fontSize: "inherit", 
                fontWeight: "bold"}}>Login as a guest</span>
            </h6>
          </AuthFormField>
          <AuthFormField>
            <label htmlFor="password">Password</label>
            <input tabIndex="2"   ref={passwordRef} autoComplete="on" type="password"></input>
            <Link style={{width: "fit-content", fontSize: "0.7em", fontWeight: "bold"}} to="/forgot-password">Forget your password?</Link>
          </AuthFormField>
          <div>
            <Button
            type="submit"
            tabIndex="3"
            submit
            style={{fontSize: "0.9em"}}
            disabled={loading}>Login</Button>
          </div>
      </Modal>
    </ModalWrapper>
  )
}

export default Login