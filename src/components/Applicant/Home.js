import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import JobCard from './JobCard';
import apiList from '../../common/Api';
import { callApi } from '../../common/CallApi';

function Home() {
    const [jobDetails, setJobDetails] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const getJobDetails = async () => {
        try {
            const response = await callApi('get', apiList.getJobs, null, token);
            console.log('Job details:', response);
            setJobDetails(response);
        } catch (error) {
            console.error('Error while fetching job details:', error);
            message.error(error.error);
        }
    };

    useEffect(() => {
        getJobDetails();
    }, []);

    return (
        <div>
            {jobDetails.map((jobInfo, index) => (
                <JobCard
                    key={index}
                    jobTitle={jobInfo.job.title}
                    skillsRequired={jobInfo.job.skills}
                    jobType={jobInfo.job.type}
                    duration={jobInfo.job.duration}
                    salary={jobInfo.job.salary}
                    deadline={jobInfo.job.applicationDeadline}
                    numberOfOpenings={jobInfo.job.numberOfOpenings}
                    location={jobInfo.job.location}
                    experienceLevel={jobInfo.job.experienceLevel}
                    education={jobInfo.job.educationRequirements}
                    benefits={jobInfo.job.benefits}
                    description={jobInfo.job.description}
                    companyName={jobInfo.company.name}
                    companyLocation={jobInfo.company.location || 'pune'}
                    companyLogo = {jobInfo.company.profile}
                    jobId={jobInfo.job._id}
                />
            ))}
        </div>
    );
}

export default Home;
