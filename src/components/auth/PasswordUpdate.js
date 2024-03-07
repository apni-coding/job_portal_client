import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { isDisabled } from '@testing-library/user-event/dist/utils';
import { callApi } from '../../common/CallApi';
import apiList from '../../common/Api';

const { Item } = Form;

const PasswordUpdate = (props) => {

    const [passwordDetails, setPasswordDetails] = useState({
        password: '',
        confirmPassword: '',
    });
    const [email, setEmail] = useState('')
    const [isScreenVisible, setIsScreenVisible] = useState(false);
    const navigate = useNavigate()
    const handleUpdatePassword = async() => {
        if (passwordDetails.password !== passwordDetails.confirmPassword) {
            message.error('Passwords do not match!');
            return;
        }
        try {
            const response = await callApi('put', apiList.updatePassword, passwordDetails);
            console.log('Password update',response)
            message.success(response.message || 'Password Update');
            navigate('/signin')
        } catch (error) {
           console.log('error while singin', error) ;
           message.error(error.error);
        }
    };

    const handleChanges = (changedValues) => {
        setPasswordDetails((prevPasswordDetails) => ({
            ...prevPasswordDetails,
            ...changedValues,
        }));
    };
    useEffect(() => {
        if (props.email) {
            setEmail(props.email);
            setIsScreenVisible(true);
        }else{
            setIsScreenVisible(false)
        }
    }, []);

    return (
        <>
            {isScreenVisible && (
                <Form
                    name="update_password_form"
                    onFinish={handleUpdatePassword}
                    onValuesChange={handleChanges}
                    style={{ marginTop: '24px' }}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                    >
                        <Input disabled={true} placeholder={email} prefix={<LockOutlined />} />
                    </Form.Item>


                    <Form.Item
                        name="password"
                        label="New Password"
                        rules={[{ required: true, message: 'Please input your new password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        rules={[{ required: true, message: 'Please confirm your new password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update Password
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </>
    );

};

export default PasswordUpdate;
