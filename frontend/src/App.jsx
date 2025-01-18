import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Kundli from './pages/Kundli'; // Example private page

function App() {
  return (
    <AuthProvider>
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Protect routes using ProtectedRoute */}
          <Route
            path="/kundli"
            element={
              <ProtectedRoute>
                <Kundli />
              </ProtectedRoute>
            }
          />
        </Routes>
      
    </AuthProvider>
  );
}

export default App;
