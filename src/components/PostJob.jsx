import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function PostJob() {
    const [form, setForm] = useState({ title: '', requirements: '', salary: '', location: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/job_server/api/post-job.php', form);
            setMessage(response.data.message);
        } catch (error) {
            console.error(error);
            setMessage('Failed to post job.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-white">Post a Job</h2>
            {message && (
                <div className={`alert ${message.includes('Failed') ? 'alert-danger' : 'alert-success'}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit} className="shadow p-4 rounded bg-dark text-white">
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Job Title"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Requirements</label>
                    <textarea
                        name="requirements"
                        className="form-control"
                        placeholder="Job Requirements"
                        rows="4"
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Salary</label>
                    <input
                        type="text"
                        name="salary"
                        className="form-control"
                        placeholder="Salary"
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                        type="text"
                        name="location"
                        className="form-control"
                        placeholder="Job Location"
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Post Job
                </button>
            </form>
        </div>
    );
}

export default PostJob;