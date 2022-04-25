import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import UpdateAccount from './components/UpdateProfile';
import RequireBooking from './components/RequireBooking';
import RequireAuth from './components/RequireAuth';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import { AuthProvider } from './contexts/AuthContext';
import Bookings from './components/Bookings';
import RequireNotUser from './components/RequireNotUser';
import BookHome from './components/BookHome';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signup" 
          element={
            <RequireNotUser>
              <SignUp />
            </RequireNotUser>
            }/>
          <Route path="/login" 
          element={
            <RequireNotUser>
              <Login />
            </RequireNotUser>
          }/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/bookings"
          element={
            <RequireAuth>
              <RequireBooking>
                <Bookings/>
              </RequireBooking>
            </RequireAuth>
          }/>
          <Route path="/book-home" element={
          <RequireAuth>
            <BookHome/>
          </RequireAuth>}/>
          <Route path="/update-profile" element={
            <RequireAuth>
              <UpdateAccount/>
            </RequireAuth>
          }/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
