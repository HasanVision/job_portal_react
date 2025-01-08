import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostJob from './components/PostJob';
import JobList from './components/JobList';
import 'bootstrap/dist/css/bootstrap.min.css';
import SingleJob from './components/singleJob';

function App() {
    return (
        <Router>
            <div className="bg-dark text-white" style={{ minHeight: '100vh' }}>
                <Navbar />
                <div className="container py-4">
                    <Routes>
                        <Route path="/" element={<JobList />} />
                        <Route path="/post-job" element={<PostJob />} />
                        <Route path="/job/:id" element={<SingleJob />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;