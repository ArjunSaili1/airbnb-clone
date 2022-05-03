import React, { useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import ModalWrapper from '../styled/ModalWrapper';

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
        <form className="modal">
          <div className="modal-header">
            <h1 className="modal-title">Forgot Password</h1>
            <h5 className="redirect-text">Remember your password? <Link to="/login">Log in</Link></h5>
            {error ? <h5 className="error">{error}</h5> : null}
            {success ? <h5 className="password-email-sent">Email Sent! Please Check Your Inbox</h5>:null}
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input ref={emailRef} className="email" type="email"></input>
          </div>
          <div className="submit-button">
            <button 
            disabled={loading} 
            onClick={handleForgotPass}>Send Password Reset Email</button>
          </div>
      </form>
    </ModalWrapper>
  )
}

export default ForgotPassword
