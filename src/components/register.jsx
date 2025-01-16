import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/job_server/api/register.php', formData);
            if (response.data.message) {
                setMessage('Registration successful. Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
            } else {
                setMessage(response.data.error || 'An error occurred');
            }
        } catch (err) {
            setMessage('An error occurred');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
            {message && <p className="mt-3">{message}</p>}
        </div>
    );
}

export default Register;