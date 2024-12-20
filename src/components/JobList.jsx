import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://localhost/job_server/api/list-jobs.php');
                setJobs(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load job listings.');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    if (loading) {
        return <div className="text-center mt-5 text-white">Loading job listings...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-5">{error}</div>;
    }

    if (jobs.message) {
        return <div className="alert alert-warning mt-5">{jobs.message}</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-white">Job Listings</h2>
            {jobs.length === 0 ? (
                <p className="text-center text-white">No jobs available.</p>
            ) : (
                <div className="row">
                    {jobs.map((job) => (
                        <div className="col-md-6 mb-4" key={job.id}>
                            <div className="card text-white bg-dark shadow">
                                <div className="card-body">
                                    <h5 className="card-title">{job.title}</h5>
                                    <p className="card-text">
                                        <strong>Requirements:</strong> {job.requirements}
                                    </p>
                                    <p className="card-text">
                                        <strong>Salary:</strong> {job.salary || 'Not specified'}
                                    </p>
                                    <p className="card-text">
                                        <strong>Location:</strong> {job.location}
                                    </p>
                                    <p className="text-muted">
                                        Posted on: {new Date(job.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default JobList;