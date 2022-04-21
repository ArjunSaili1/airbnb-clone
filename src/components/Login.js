import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Login() {

  const emailRef = useRef(null);
  const nav = useNavigate()
  const passwordRef = useRef(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, signOutUser } = useAuth();

  async function handleLogin(e){
    e.preventDefault();
    setError('');
    try{
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      nav('/bookings')
    }catch(error){
      setError(error.code)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <div className="modal-container">
        <button onClick={signOutUser}>sign out</button>
        <form className="modal">
          <div className="modal-header">
            <h1 className="modal-title">Login</h1>
            <h5 className="redirect-text">Don't have an account? <Link to="/signup">Sign up</Link></h5>
            {error ? <h5 className="error">{error}</h5> : null}
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input ref={emailRef} className="email" type="email"></input>
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input ref={passwordRef} className="password" type="password"></input>
            <Link to="/forgot-password"><h6>Forget your password?</h6></Link>
          </div>
          <div className="submit-button">
            <button 
            disabled={loading} 
            onClick={handleLogin}>Login</button>
          </div>
      </form>
    </div>
  )
}

export default Login