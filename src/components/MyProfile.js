import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, message, Avatar, Upload, Row, Col, Modal } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { callApi } from '../common/CallApi';
import apiList from '../common/Api';

const { Meta } = Card;
const { Dragger } = Upload;

const MyProfile = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [resumeVisible, setResumeVisible] = useState(false);
    const [userData, setUserData] = useState();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await callApi('get', apiList.userInfo, null, localStorage.getItem('token'));
                console.log('response is', response)
                setUserData(response);
            } catch (error) {
                message.error(error.error);
            }
        };

        fetchUser();
    }, []);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      // Your logic to update user profile
      console.log('Updating user profile:', values);
      setLoading(false);
      message.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
      setLoading(false);
      message.error('Failed to update profile');
    }
  };

  const handleUploadResume = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleViewResume = () => {
    setResumeVisible(true);
  };

  const handleCloseResume = () => {
    setResumeVisible(false);
  };

  return (
    <>
      {userData && (
        <Row justify="center" style={{ marginTop: '50px' }}>
          <Col xs={24} sm={20} md={16} lg={12} xl={8}>
            <Card>
              <Row justify="center">
                <Avatar size={128} src={userData.profile} />
              </Row>
              
              <Form
                name="updateProfile"
                layout="vertical"
                initialValues={userData}
                onFinish={onFinish}
                style={{ marginTop: '20px' }}
              >
                <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
                  <Input />
                </Form.Item>
  
                <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                  <Input />
                </Form.Item>
  
                <Form.Item label="Contact Number" name="contactNumber" rules={[{ required: true, message: 'Please input your contact number!' }]}>
                  <Input />
                </Form.Item>
  
                <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input.Password />
                </Form.Item>
  
                <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: 'Please confirm your password!' }]}>
                  <Input.Password />
                </Form.Item>
  
                <Form.Item label="Skills" name="skills" rules={[{ required: true, message: 'Please input your skills!' }]}>
                  <Input />
                </Form.Item>
  
                <Form.Item label="Bio" name="bio" rules={[{ required: true, message: 'Please input your bio!' }]}>
                  <Input.TextArea rows={4} />
                </Form.Item>
  
                <Form.Item>
                  <Button type="primary" onClick={handleUploadResume}>
                    Upload Resume
                  </Button>
                </Form.Item>
  
                <Form.Item>
                  <Button type="primary" onClick={handleViewResume}>
                    View Resume
                  </Button>
                </Form.Item>
                <Form.Item>
                    
                </Form.Item>
                <Modal
                  title="Upload Resume"
                  visible={visible}
                  onCancel={handleCancel}
                  footer={[
                    <Button key="back" onClick={handleCancel}>
                      Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleCancel}>
                      Save
                    </Button>
                  ]}
                >
                  <Dragger>
                    <p className="ant-upload-drag-icon"><InboxOutlined /></p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single upload.</p>
                  </Dragger>
                </Modal>
  
                <Modal
                  title="Resume"
                  visible={resumeVisible}
                  onCancel={handleCloseResume}
                  footer={[
                    <Button key="close" onClick={handleCloseResume}>
                      Close
                    </Button>
                  ]}
                >
                  <iframe src={userData.resume} style={{ width: '100%', height: '500px' }} title="resume" />
                </Modal>
  
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
  
};

export default MyProfile;
