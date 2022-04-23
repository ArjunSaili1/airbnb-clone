import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import RequireBirdPathSet from './components/RequireBirdPathSet';
import RequireAuth from './components/RequireAuth';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import { AuthProvider } from './contexts/AuthContext';
import Bookings from './components/Bookings';
import RequireNotUser from './components/RequireNotUser';
import SetUpBirdPath from './components/SetUpBirdPath';

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
              <RequireBirdPathSet>
                <Bookings/>
              </RequireBirdPathSet>
            </RequireAuth>
          }/>
          <Route path="/set-bird-path" element={
          <RequireAuth>
            <SetUpBirdPath/>
          </RequireAuth>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
