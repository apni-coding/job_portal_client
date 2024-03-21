import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Card, Divider, Avatar, Button, message, Modal, DatePicker, TimePicker } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { callApi } from '../../common/CallApi';
import apiList from '../../common/Api';
import React, { useEffect, useState } from 'react';

const { Title, Text } = Typography;

const SingleApplicationInfo = () => {
  const { id } = useParams(); // Assuming you're using React Router to get the job ID
  const [jobDetails, setJobDetails] = useState({});
  const [token] = useState(localStorage.getItem('token'));
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [actionType, setActionType] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [interviewModalVisible, setInterviewModalVisible] = useState(false);
  const [interviewDate, setInterviewDate] = useState(null);
  const [interviewTime, setInterviewTime] = useState(null);
  const navigate = useNavigate('');
  useEffect(() => {
    const fetchSingleApplication = async () => {
      try {
        const response = await callApi('get', `${apiList.getApplicationByJobId}/${id}`, null, token);
        setJobDetails(response);
      } catch (error) {
        message.error(error.error);
      }
    };

    fetchSingleApplication();
  }, [id]);

  const handleAcceptReject = (userid, jobId, action) => {
    setSelectedUserId(userid);
    setActionType(action);
    setConfirmVisible(true);
  };

  const handleConfirmAction = async () => {
    try {
      setConfirmVisible(false);
      if (actionType === 'accepted') {
        // Open the interview date modal
        setInterviewModalVisible(true);
      } else if (actionType === 'rejected') {
        // Perform rejection action
        await handleFormSubmission(selectedUserId, id, actionType);
      }
    } catch (error) {
      console.error(error);
      message.error('Failed to perform action');
    }
  };

  const handleFormSubmission = async (userId, jobId, action) => {
    try {
      setInterviewModalVisible(false);
      console.log(userId, jobId, action);
      const response = await callApi('post', `${apiList.applicationAction}`, {userId, jobId, action, interviewDate:null}, token);
     message.success(response.message);
     navigate('/recruiter/applications')
    } catch (error) {
      console.error(error);
      message.error(error.error);
    }
  };

  const handleInterviewModalClose = () => {
    setInterviewModalVisible(false);
  };

  const handleInterviewDateChange = (date) => {
    setInterviewDate(date);
  };

  const handleInterviewTimeChange = (time) => {
    setInterviewTime(time);
  };

  const isFormValid = () => {
    return interviewDate && interviewTime;
  };

  return (
    <>
      {jobDetails.jobInfo &&
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Title level={2}>Job Title: {jobDetails.jobInfo.title || null}</Title>
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
                <Button type="primary" onClick={() => handleAcceptReject(applicant._id, id, 'accepted')}>Accept</Button>
                <Button type="danger" onClick={() => handleAcceptReject(applicant._id, id, 'rejected')}>Reject</Button>
                <Button type="default" icon={<DownloadOutlined />} href={applicant.resume} target="_blank" rel="noopener noreferrer">Download Resume</Button>
              </div>
            </Card>
          ))}
        </div>
      }

      <Modal
        title="Confirmation"
        visible={confirmVisible}
        onCancel={() => setConfirmVisible(false)}
        onOk={handleConfirmAction}
      >
        Are you sure you want to {actionType} this application?
      </Modal>

      <Modal
        title="Interview Date"
        visible={interviewModalVisible}
        onCancel={handleInterviewModalClose}
        onOk={() => handleFormSubmission(selectedUserId, id, 'accepted')}
        okButtonProps={{ disabled: !isFormValid() }}
      >
        <DatePicker onChange={handleInterviewDateChange} />
        <TimePicker onChange={handleInterviewTimeChange} />
      </Modal>
    </>
  );
};

export default SingleApplicationInfo;
