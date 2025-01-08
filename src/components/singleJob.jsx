import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleJob = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost/job_server/api/single-job.php?id=${id}`);
                setJob(response.data); 
            } catch (error) {
                console.error(error);
                setError("Failed to load job details.");
            }
        };

        fetchPost();
    }, [id]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-4">
            <h1 className="mb-4">{job.title}</h1>
            <p>{job.requirements}</p>
            <p>{job.salary}</p>
            <p>{job.location}</p>
            <p>{job.created_at}</p>
            <hr />
        </div>
    );
};

export default SingleJob;