import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';

const { Item } = Form;

const PasswordUpdate = () => {
    const [passwordDetails, setPasswordDetails] = useState({
        newPassword: '',
        confirmPassword: '',
    });

    const handleUpdatePassword = () => {
        if (passwordDetails.newPassword !== passwordDetails.confirmPassword) {
            message.error('Passwords do not match!');
            return;
        }
        // Implement handleUpdatePassword logic
        console.log(passwordDetails);
    };

    const handleChanges = (changedValues) => {
        setPasswordDetails((prevPasswordDetails) => ({
            ...prevPasswordDetails,
            ...changedValues,
        }));
    };

    return (
        <Form
            name="update_password_form"
            onFinish={handleUpdatePassword}
            onValuesChange={handleChanges}
            style={{ marginTop: '24px' }}
        >
            <Item
                name="newPassword"
                label="New Password"
                rules={[{ required: true, message: 'Please input your new password!' }]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
            </Item>
            <Item
                name="confirmPassword"
                label="Confirm Password"
                rules={[{ required: true, message: 'Please confirm your new password!' }]}
            >
                <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
            </Item>
            <Item>
                <Button type="primary" htmlType="submit">
                    Update Password
                </Button>
            </Item>
        </Form>
    );
};

export default PasswordUpdate;
