import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/Pages/SignUp/SignUp';
import UpdateAccount from './components/Pages/UpdateProfile/UpdateProfile';
import RequireAuth from './privateRoutes/RequireAuth';
import Login from './components/Pages/Login/Login';
import ForgotPassword from './components/Pages/ForgotPassword/ForgotPassword';
import { AuthProvider } from './contexts/AuthContext';
import MyBooking from './components/Pages/MyBooking/MyBooking';
import { DbProvider } from './contexts/DatabaseContext';
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
