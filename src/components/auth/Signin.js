import React, { useState } from 'react';
import { Typography, Input, Button, Form, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { callApi } from '../../common/CallApi';
import apiList from '../../common/Api';

const { Item } = Form;
const { Title } = Typography;

const Signin = () => {
    const [signinDetails, setSigninDetails] = useState({
        email: '',
        password: '',
    });

    const handleSignin = async() => {
        console.log(signinDetails);
        try {
            const response = await callApi('post', apiList.signin, signinDetails);
            console.log('sigin successfully',response)
            message.success(response.message || 'Sigin successfully');
        } catch (error) {
           console.log('error while singin', error) ;
           message.error(error);
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
                    Don't have an account? <a href="#">Signup</a>
                </Item>
                <Item>
                    Forgot password? <a href="#">Reset password</a>
                </Item>
            </Form>
        </div>
    );
};

export default Signin;
