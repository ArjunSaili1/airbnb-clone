import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import UpdateAccount from './components/UpdateProfile';
import RequireAuth from './components/RequireAuth';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import { AuthProvider } from './contexts/AuthContext';
import Bookings from './components/Bookings';
import { DbProvider } from './contexts/DatabaseContext';
import RequireNotUser from './components/RequireNotUser';
import BookHome from './components/BookHome';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <DbProvider>
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
            <Route path="/forgot-password" 
            element={
              <RequireNotUser>
                <ForgotPassword/>
              </RequireNotUser>
            }/>
            <Route path="/bookings"
            element={
              <RequireAuth>
                <Bookings/>
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
        </DbProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
