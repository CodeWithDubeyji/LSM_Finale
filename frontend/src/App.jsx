import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Kundli from './pages/Kundli'; // Example private page
import MeditationAndWorkout from './pages/MeditationAndWorkout';
import Chatbot from './pages/Chatbot';
import Layout from './Layout';

function App() {
  return (
    <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Home />} />

          {/* Routes with persistent Layout */}
          <Route element={<Layout />}>
            {/* Protected routes */}
            <Route
              path="/kundli/*"
              element={
                <ProtectedRoute>
                  <Kundli />
                </ProtectedRoute>
              }
            />
            <Route
              path="/meditation-workout/*"
              element={
                <ProtectedRoute>
                  <MeditationAndWorkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbot/*"
              element={
                <ProtectedRoute>
                  <Chatbot />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
    </AuthProvider>
  );
}

export default App;
