import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminHome';
import { useState } from 'react';
import './index.css';

function App() {
  const [auth, setAuth] = useState({ isLoggedIn: false, role: null });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setAuth={setAuth} />} />
        <Route path="/home" element={
          auth.isLoggedIn && auth.role === 'user' ? <Home /> : <Navigate to="/" />
        } />
        <Route path="/admin" element={
          auth.isLoggedIn && auth.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />
        } />
      </Routes>
    </Router>
  );
}

export default App;
