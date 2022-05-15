import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/Pages/SignUp/SignUp';
import UpdateAccount from './components/Pages/UpdateProfile/UpdateProfile';
import RequireAuth from './privateRoutes/RequireAuth';
import Login from './components/Pages/Login/Login';
import ForgotPassword from './components/Pages/ForgotPassword/ForgotPassword';
import { AuthProvider } from './contexts/auth/AuthProvider';
import MyBooking from './components/Pages/MyBooking/MyBooking';
import { DbProvider } from './contexts/database/DatabaseProvider';
import RequireNotUser from './privateRoutes/RequireNotUser';
import BookHome from './components/Pages/BookAHome/BookHome';
import GlobalStyles from './GlobalStyles';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <DbProvider>
          <GlobalStyles/>
          <Routes>
            <Route path="*" element={<Navigate to="/login"/>}/>
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
            <Route path="/my-booking"
            element={
              <RequireAuth>
                <MyBooking/>
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
