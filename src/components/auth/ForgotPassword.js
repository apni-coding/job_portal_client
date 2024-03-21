import React, { useState, useEffect } from 'react';
import { Typography, Input, Button, Form, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { callApi } from '../../common/CallApi';
import apiList from '../../common/Api';
import PasswordUpdate from './PasswordUpdate';
import { useNavigate } from 'react-router-dom';

const { Item } = Form;
const { Title } = Typography;

const ForgotPassword = () => {
    const [forgotPasswordDetails, setForgotPasswordDetails] = useState({
        email: '',
        otp: ''
    });
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [resendTimeout, setResendTimeout] = useState(null);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const [passwordScreen, setPasswordScreen] = useState(false);
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        try {
            const response = await callApi('post', apiList.forgotPasswordOtp, forgotPasswordDetails);
            console.log('otp send response is', response)
            message.success(response.message);
            setIsOtpSent(true);
            setResendDisabled(true);
            setResendTimeout(setTimeout(() => setResendDisabled(false), 30000)); // Resend otp after 30 seconds
            startCountdown();
        } catch (error) {
            console.log(`error while send otp for forget`, error.error);
            message.error(error.error)
        }

    };

    const handleOtpVerify = async() => {
        try {
            const response = await callApi('post', apiList.verifyOtp, forgotPasswordDetails);
            console.log('verify response is', response)
            message.success(response.message);
            setPasswordScreen(true);
        } catch (error) {
            console.log(`error while verify otp`, error.error);
            message.error(error.error)
        }
    };

    const handleResendOTP = async () => {
        try {
            const response = await callApi('post', apiList.forgotPasswordOtp, forgotPasswordDetails);
            console.log('resend response is', response)
            setResendDisabled(true);
            setCountdown(30);
            clearInterval(resendTimeout);
            startCountdown(); 
            setResendTimeout(setTimeout(() => {
                setResendDisabled(false);
                
            }, 30000)); // Resend otp after 30 seconds
            message.success(response.message);
        } catch (error) {
            console.log(`error while send otp for resend`, error.error);
            message.error(error.error)
        }
    };

    const handleChanges = (changedValues) => {
        setForgotPasswordDetails((prevForgotPasswordDetails) => ({
            ...prevForgotPasswordDetails,
            ...changedValues,
        }));
    };

    const startCountdown = () => {
        const interval = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    clearInterval(interval);
                    return 0;
                } else {
                    return prevCountdown - 1;
                }
            });
        }, 1000);
    };

    useEffect(() => {

        return () => {
            clearInterval(resendTimeout); // Clear timeout on component unmount
        };
    }, [resendTimeout]);

    return (
        <div style={{ padding: '60px' }}>
            <Title level={3}>Testing 3</Title>
            {!isOtpSent ? (
                <Form
                    name="forgotpassword_form"
                    onFinish={handleForgotPassword}
                    onValuesChange={handleChanges}
                    style={{ marginTop: '24px' }}
                >
                    <Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'The input is not a valid E-mail!' },
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">
                            Send OTP
                        </Button>
                    </Item>
                </Form>
            ) : (
                !passwordScreen ? (
                    <Form
                        name="forgotpassword_form"
                        onFinish={handleOtpVerify}
                        onValuesChange={handleChanges}
                        style={{ marginTop: '24px' }}
                    >
                        <Item
                            name="otp"
                            label="Enter OTP"
                            rules={[{ required: true, message: 'Please input your OTP!' }]}
                        >
                            <Input prefix={<LockOutlined />} placeholder="6 digit OTP" />
                        </Item>
                        <Item>
                            <Button type="link" disabled={resendDisabled} onClick={handleResendOTP}>
                                Resend OTP {countdown > 0 ? <>({countdown}S) </> : null}
                            </Button>
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Item>
                    </Form>
                ) : (
                    <PasswordUpdate email={forgotPasswordDetails.email} />
                )
            )}
        </div>
    );
};

export default ForgotPassword;
