import React, { useRef, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ModalWrapper from '../../SharedStyles/ModalWrapper';
import Modal from '../../SharedStyles/Modal';
import ModalHeader from '../../SharedStyles/ModalHeader';
import Button from '../../SharedStyles/Button';
import AuthFormField from '../../SharedStyles/AuthFormField';

function ForgotPassword() {

  const emailRef = useRef(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();

  async function handleForgotPass(e){
    e.preventDefault();
    setError('');
    try{
      setLoading(true)
      await forgotPassword(emailRef.current.value)
      setSuccess(true)
    }catch(error){
      setError(error.code)
      setSuccess(false)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <ModalWrapper>
        <Modal>
          <ModalHeader>
            <h1>Forgot Password</h1>
            <h5 style={{margin: "10px 0"}}>Remember your password? <Link to="/login">Log in</Link></h5>
            {error ? <h5 style={{color: "red"}}>{error}</h5> : null}
            {success ? <h5 style={{color: "green"}}>Email Sent! Please Check Your Inbox</h5>:null}
          </ModalHeader>
          <AuthFormField>
            <label htmlFor="email">Email</label>
            <input ref={emailRef} type="email"></input>
          </AuthFormField>
          <div>
            <Button 
            disabled={loading} 
            onClick={handleForgotPass}>Send Password Reset Email</Button>
          </div>
      </Modal>
    </ModalWrapper>
  )
}

export default ForgotPassword
