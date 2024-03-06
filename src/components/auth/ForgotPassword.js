import React, { useState, useEffect } from 'react';
import { Typography, Input, Button, Form } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

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

    const handleForgotPassword = () => {
        console.log(forgotPasswordDetails);
        setIsOtpSent(true);
        setResendDisabled(true);
        setResendTimeout(setTimeout(() => setResendDisabled(false), 30000)); // Resend otp after 30 seconds
        startCountdown();
    };

    const handleOtpVerify = () => {
        console.log(forgotPasswordDetails);
    };

    const handleResendOTP = () => {
        // Implement resend OTP logic
        // setIsOtpSent(false);
        setResendDisabled(true);
        setCountdown(30);
        clearInterval(resendTimeout); // Clear the countdown interval
        setResendTimeout(setTimeout(() => {
            setResendDisabled(false);
            startCountdown();
        }, 30000)); // Resend otp after 30 seconds
        window.alert('click')
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
                            Resend OTP {countdown>0 ? <>({countdown}S) </>: null}
                        </Button>
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Item>
                </Form>
            )}
        </div>
    );
};

export default ForgotPassword;
