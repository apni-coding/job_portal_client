import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Card, Divider, Avatar, Button, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { callApi } from '../../common/CallApi';
import apiList from '../../common/Api';

const { Title, Text } = Typography;

const SingleApplicationInfo = () => {
  const { id } = useParams(); // Assuming you're using React Router to get the job ID
  const [jobDetails, setJobDetails] = useState([]);
  const [token] = useState(localStorage.getItem('token'))
  // Dummy data for demonstration
  // const jobDetails = {
  //   id: id,
  //   title: "Software Engineer",
  //   location: "New York",
  //   description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  //   applicants: [
  //     { 
  //       id: 1, 
  //       name: "John Doe", 
  //       email: "john@example.com", 
  //       experience: "3 years", 
  //       profilePic: "https://via.placeholder.com/150", 
  //       resumeLink: "https://example.com/resume1.pdf", 
  //       currentLocation: "San Francisco", 
  //       skills: ["JavaScript", "React", "Node.js"] 
  //     },
  //     { 
  //       id: 2, 
  //       name: "Jane Smith", 
  //       email: "jane@example.com", 
  //       experience: "5 years", 
  //       profilePic: "https://via.placeholder.com/150", 
  //       resumeLink: "https://example.com/resume2.pdf", 
  //       currentLocation: "New York", 
  //       skills: ["Python", "Django", "SQL"] 
  //     },
  //     // More applicants...
  //   ]
  // };
  useEffect(() => {
    const fetchSingleApplication = async () => {
        try {
            const response = await callApi('get', apiList.getApplicationByJobId + '/' + id, null, token);
            console.log('response is', response)
            setJobDetails(response);
        } catch (error) {
            message.error(error.error);
        }
    };

    fetchSingleApplication();
}, []);

  const handleAcceptReject = (applicantId, action) => {
    // Handle accept/reject action here
    console.log(`Applicant ${applicantId} ${action}`);
  };

  return (
    
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Title level={2}>Job Title:-{jobDetails.jobInfo.title}</Title>
      <Divider />
      <Title level={3}>Applicants</Title>
      {jobDetails.userInfo.map(applicant => (
        <Card key={applicant._id} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={applicant.profile} size={64} style={{ marginRight: 16 }} />
            <div>
              <Title level={4}>{applicant.name}</Title>
              <Text>Email: {applicant.email}</Text><br />
              <Text>Experience: {applicant.experience || '3.5 Years'}</Text><br />
              <Text>Current Location: {applicant.location || 'Noida'}</Text><br />
              <Text>Skills: {applicant.skills.join(', ')}</Text>
            </div>
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" onClick={() => handleAcceptReject(applicant._id, 'accepted')}>Accept</Button>
            <Button type="danger" onClick={() => handleAcceptReject(applicant._id, 'rejected')}>Reject</Button>
            <Button type="default" icon={<DownloadOutlined />} href={applicant.resume} target="_blank" rel="noopener noreferrer">Download Resume</Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SingleApplicationInfo;
