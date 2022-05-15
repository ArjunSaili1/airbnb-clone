import React, { useRef } from 'react'
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
import { ModalHeader, Modal, ModalWrapper, Button, AuthFormField } from '../../SharedStyles';
import useAccount from '../../../hooks/useAccount';

function ForgotPassword() {

  const emailRef = useRef(null)
  const {loading, success, error, statusUpdate} = useAccount()
  const { forgotPassword } = useAuth()

  async function handleForgotPass(e){
    e.preventDefault()
    try{
      statusUpdate({type: "form_submit"})
      await forgotPassword(emailRef.current.value)
      statusUpdate({type: "auth_success"})
    }catch(error){
      statusUpdate({type: "error", code: error.code})
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
