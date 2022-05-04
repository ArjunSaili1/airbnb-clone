import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ModalWrapper from './UI components/ModalWrapper';
import Modal from './UI components/Modal';
import ModalHeader from './UI components/ModalHeader';
import Button from './UI components/Button';
import AuthFormField from './UI components/AuthFormField';

function Login() {

  const emailRef = useRef(null);
  const nav = useNavigate()
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  async function handleLogin(e){
    e.preventDefault();
    setError('');
    try{
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      nav('/my-booking')
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
            <h1>Login</h1>
            <h5 style={{margin: "10px 0"}}>Don't have an account? <Link to="/signup">Sign up</Link></h5>
            {error ? <h5>{error}</h5> : null}
          </ModalHeader>
          <AuthFormField>
            <label htmlFor="email">Email</label>
            <input ref={emailRef} autoComplete="on" type="email"></input>
          </AuthFormField>
          <AuthFormField>
            <label htmlFor="password">Password</label>
            <input ref={passwordRef} autoComplete="on" type="password"></input>
            <Link style={{width: "fit-content"}} to="/forgot-password"><h6>Forget your password?</h6></Link>
          </AuthFormField>
          <div>
            <Button 
            disabled={loading} 
            onClick={handleLogin}>Login</Button>
          </div>
      </Modal>
    </ModalWrapper>
  )
}

export default Login