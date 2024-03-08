// OwnJobList.js
import React, { useEffect, useState } from 'react';
import { Empty, Select, message } from 'antd';
import { callApi } from '../../common/CallApi';
import apiList from '../../common/Api';
import JobCard from './JobCard';

const { Option } = Select;

const OwnJobList = () => {
    const [jobs, setJobs] = useState([]);
    const [filter, setFilter] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await callApi('get', apiList.getmyJob+'/'+ filter, null, token);
                console.log('response is', response)
                setJobs(response);
            } catch (error) {
                message.error(error.error);
            }
        };

        fetchJobs();
    }, [token, filter]);

    return (
        <div>
            <Select
                defaultValue={'Active Jobs'}
                style={{ width: 200, marginBottom: 20 }}
                onChange={value => setFilter(value)}
            >
                <Option value={true}>Active Jobs</Option>
                <Option value={false}>Closed Jobs</Option>
            </Select>
            {jobs.length > 0 ? (
                <JobCard jobs={jobs} />
            ) : (
                <Empty description="No data found" />
            )}
        </div>
    );
};

export default OwnJobList;
