import React, { useState } from 'react';
import { Card, Button, Modal, message } from 'antd';
import apiList from '../../common/Api';
import { callApi } from '../../common/CallApi';
import { useNavigate } from 'react-router-dom/dist';

const { Meta } = Card;

const JobCard = (props) => {
    const {
        jobTitle,
        jobType,
        companyName,
        companyLocation,
        companyLogo,
        description,
        skillsRequired,
        duration,
        salary,
        deadline,
        numberOfOpenings,
        location,
        experienceLevel,
        education,
        benefits,
        jobId
    } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    const handleViewMore = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleApplyNow =async (jobId) => {
        try {
            const response = await callApi('post', apiList.applyJob, {jobId}, token);
            console.log('Job details:', response);
           message.success(response.message);
           window.location.reload();
        } catch (error) {
            console.error('Error while fetching job details:', error);
            message.error(error.error);
        }
    };

    return (
        <>
            <Card
                title={jobTitle}
                style={{ width: 300 }}
                actions={[
                    <Button type="primary" onClick={handleViewMore}>View More</Button>,
                    <Button type="primary" onClick={()=>{handleApplyNow(jobId)}}>Apply Now</Button>
                ]}
            >
                <Meta
                    title={companyName}
                    description={`Location: ${companyLocation}`}
                />
                <p><strong>Job Type:</strong> {jobType}</p>
            </Card>
            <Modal
                title={jobTitle}
                visible={modalVisible}
                onCancel={handleModalClose}
                footer={[
                    <Button key="applyNow" type="primary" onClick={()=>{handleApplyNow(jobId)}}>
                        Apply Now
                    </Button>,
                    <Button key="cancel" onClick={handleModalClose}>
                        Cancel
                    </Button>,
                ]}
            >
                <p><strong>Job Type:</strong> {jobType}</p>
                <p><strong>Description:</strong> {description}</p>
                <p><strong>Skills Required:</strong> {skillsRequired}</p>
                <p><strong>Duration:</strong> {duration}</p>
                <p><strong>Salary:</strong> {salary}</p>
                <p><strong>Deadline:</strong> {deadline}</p>
                <p><strong>Number of Openings:</strong> {numberOfOpenings}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Experience Level:</strong> {experienceLevel}</p>
                <p><strong>Education Requirements:</strong> {education}</p>
                <p><strong>Benefits:</strong> {benefits}</p>
            </Modal>
        </>
    );
};

export default JobCard;
