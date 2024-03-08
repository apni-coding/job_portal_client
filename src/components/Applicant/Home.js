import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import JobCard from './JobCard';
import apiList from '../../common/Api';
import { callApi } from '../../common/CallApi';

function Home() {
    const [jobDetails, setJobDetails] = useState([]);

    const getJobDetails = async () => {
        try {
            const response = await callApi('get', apiList.addJob);
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
            {jobDetails.map((job, index) => (
                <JobCard
                    key={index}
                    jobTitle={job.title}
                    skillsRequired={job.skills}
                    jobType={job.type}
                    duration={job.duration}
                    salary={job.salary}
                    deadline={job.applicationDeadline}
                    numberOfOpenings={job.numberOfOpenings}
                    location={job.location}
                    experienceLevel={job.experienceLevel}
                    education={job.educationRequirements}
                    benefits={job.benefits}
                    description={job.description}
                    companyName={job.companyInfo.name}
                    companyLocation={job.companyInfo.location || 'pune'}
                    companyLogo = {job.companyInfo.profile}
                    jobId={job._id}
                />
            ))}
        </div>
    );
}

export default Home;
