import React, { useEffect, useState } from 'react'
import ApplicationCard from './ApplicationCard'
import { callApi } from '../../common/CallApi';
import apiList from '../../common/Api';
import { message } from 'antd';

function Application() {
    const [token] = useState(localStorage.getItem('token'));
    const [jobInfo, setJobInfo] = useState([])
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await callApi('get', apiList.jobsWithApplicationCount, null, token);
                console.log('response is', response)
                setJobInfo(response);
            } catch (error) {
                message.error(error.error);
            }
        };

        fetchApplications();
    }, []);
    return (
        <div>
            {
                jobInfo.map((job) => (
                    <ApplicationCard key={job.id} jobTitle={job.title} numApplications={job.applicationCount} id={job._id} />
                ))
            }
        </div>
    );
    
}

export default Application
