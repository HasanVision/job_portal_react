import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function JobList() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const limit = 4; 

    const fetchJobs = async (page = 1) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost/job_server/api/list-jobs.php?page=${page}&limit=${limit}`);
            setJobs(response.data.jobs);
            setTotalPages(response.data.pagination.totalPages);
            setCurrentPage(response.data.pagination.currentPage);
        } catch (err) {
            console.error(err);
            setError('Failed to load job listings.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs(currentPage);
    }, [currentPage]);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <div className="text-center mt-5 text-white">Loading job listings...</div>;
    }

    if (error) {
        return <div className="alert alert-danger mt-5">{error}</div>;
    }

    if (!jobs || jobs.length === 0) {
        return <div className="alert alert-warning mt-5">No jobs available.</div>;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-white">Job Listings</h2>
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
                                <Link to={`/job/${job.id}`} className="btn btn-primary mt-2">
                                    View Job
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4">
                <button
                    className="btn btn-secondary"
                    onClick={handlePrevious}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <div>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
                            onClick={() => handlePageClick(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button
                    className="btn btn-secondary"
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default JobList;