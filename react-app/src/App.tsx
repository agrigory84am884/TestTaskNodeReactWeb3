import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import HomePage from './pages/home/main';
import LoginPage from './pages/auth/Login';
import Register from './pages/auth/Register';
import UserHome from './pages/user/UserHome';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          <Route path="/user/home" element={<ProtectedRoute element={<UserHome />} />} />
          {/* Add more routes here */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
