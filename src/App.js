import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostJob from './components/PostJob';
import JobList from './components/JobList';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleJob from './components/singleJob';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import Register from './components/register';
import Login from './components/login';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="bg-dark text-white" style={{ minHeight: '100vh' }}>
                    <Navbar />
                    <div className="container py-4">
                        <Routes>
                         
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login />} />

                        
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <JobList />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/post-job"
                                element={
                                    <ProtectedRoute>
                                        <PostJob />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/job/:id"
                                element={
                                    <ProtectedRoute>
                                        <SingleJob />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;