import React, { useState, useEffect } from 'react';
import { Card, Button, List, Tag, message } from 'antd';
import axios from 'axios';
import { callApi } from '../../common/CallApi';
import apiList from '../../common/Api';

const { Meta } = Card;

const AppliedJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);


    useEffect(() => {
        fetchAppliedJobs();
    }, []);

    const fetchAppliedJobs = async () => {
        try {
            const response = await callApi('get', apiList.appliedJobs, null, localStorage.getItem('token'));
            setAppliedJobs(response);
        } catch (error) {
            console.error('Error fetching applied jobs:', error);
            message.error(error.error)
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Applied Jobs</h1>
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={appliedJobs}
                renderItem={(job) => (
                    <List.Item>
                        <Card
                            hoverable
                            style={{ width: 300, marginBottom: '20px' }}
                        >
                            <Meta
                                title={job.title}
                                description={job.description.slice(0, 30)} 
                            />

                            <div style={{ marginTop: '10px' }}>
                                <Tag color={job.status === 'accepted' ? 'green' : job.status === 'rejected' ? 'red' : 'blue'}>
                                    {job.status.toUpperCase()}
                                </Tag>
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default AppliedJobs;
