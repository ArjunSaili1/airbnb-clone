import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import RequireAuth from './components/RequireAuth';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import { AuthProvider } from './contexts/AuthContext';
import InitialPage from './components/InitialPage';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/signedin/*"
          element={
            <RequireAuth>
              <InitialPage/>
            </RequireAuth>
          }>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
