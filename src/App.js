import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/signup" exact element={<SignUp />}/>
          <Route path="/login" exact element={<Login />}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
