import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const ApplicationCard = ({ jobTitle, numApplications, id }) => {
  const navigate = useNavigate();

  const handleClick = (jobid) => {
    // Navigate to the route with the specific ID
    navigate(`/recruiter/applications/${jobid}`);
  };

  return (
    <Card
      style={{ width: 300, margin: '16px auto', textAlign: 'center' }}
      hoverable
      onClick={()=>handleClick(id)}
    >
      <h3 style={{ marginBottom: 10 }}>{jobTitle}</h3>
      <p style={{ marginBottom: 0 }}>Number of Applications: {numApplications}</p>
    </Card>
  );
};

export default ApplicationCard;
