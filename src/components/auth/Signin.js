import React, { useState } from 'react';
import { Typography, Input, Button, Form, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { callApi } from '../../common/CallApi';
import apiList from '../../common/Api';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signinUser } from '../../redux/actions/authAction';


const { Item } = Form;
const { Title } = Typography;

const Signin = () => {
    const dispatch = useDispatch();
    const [signinDetails, setSigninDetails] = useState({
        email: '',
        password: '',
    });

    const handleSignin = async () => {
        console.log(signinDetails);
        try {
            const response = await callApi('post', apiList.signin, signinDetails);
            console.log('sigin successfully', response)
            localStorage.setItem('token', response.token)
            message.success(response.message || 'Sigin successfully');
            dispatch(signinUser(response.userType))
        } catch (error) {
            console.log('error while singin', error);
            message.error(error.error);
        }
    };

    const handleChanges = (changedValues) => {
        setSigninDetails((prevSignupDetails) => ({
            ...prevSignupDetails,
            ...changedValues,
        }));
    };

    return (
        <div style={{ padding: '60px' }}>
            <Title level={3}>Testing 2</Title>
            <Form
                name="signin_form"
                onFinish={handleSignin}
                onValuesChange={handleChanges}
                style={{ marginTop: '24px' }}
            >
                <Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'The input is not valid E-mail!' },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                </Item>
                <Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit">
                        Signin
                    </Button>
                </Item>
                <Item>
                    Don't have an account? <Link to='/signup'>Signup </Link>
                </Item>
                <Item>
                    Forgot password?  <Link to='/forgot-password'>Reset password</Link>
                </Item>
            </Form>
        </div>
    );
};

export default Signin;
