import { useState } from 'react';
import { Typography, Input, Button, Select, Form, Upload, message } from 'antd';
import { MailOutlined, LockOutlined, InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { callApi } from '../../common/CallApi';
import apiList from '../../common/Api';
import { Link } from 'react-router-dom';

const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;

const Signup = () => {
    const [form] = Form.useForm();
    const [categoryType, setCategoryType] = useState('applicant')
    const [skillsData, setSkillData] = useState(['react js', 'node js', 'python', 'excel'])

    const handleCategoryChange = (e) => {
        setCategoryType(e);
    }
    const handleSignup = async (values) => {
        try {
            console.log(form)
            if (values.password !== values.confirmPassword) {
                message.error('Password and confirm password not matched!');
                return;
            }
            const formData = new FormData();
            //add image and pdf buffer in formdata
            Object.keys(values).forEach(key => {
                if (key === 'profile' && values[key]) {
                    values[key].forEach(file => {
                        formData.append(key, file.originFileObj);
                    });
                } else if (key === 'resume' && values[key] && categoryType === 'applicant') {
                    values[key].forEach(file => {
                        formData.append(key, file.originFileObj);
                    });
                } else {
                    formData.append(key, values[key]);
                }
            });
            const response = await callApi('post', apiList.signup, formData);
            message.success(response.message);
        } catch (error) {
            console.error('Signup error:', error);
            let errorMessage = 'An error occurred';
            if (error) {
                message.error(error);
                return;
            }
            message.error(errorMessage);
        }
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    return (
        <>
            <div style={{ padding: '60px' }}>
                <Typography variant="h3" component="h2">
                    Testing
                </Typography>
                <Form
                    form={form}
                    name="signup_form"
                    initialValues={{ type: 'applicant' }}
                    onFinish={handleSignup}

                    style={{ marginTop: '24px' }}
                >
                    <Item
                        name="type"
                        label="Category"

                        rules={[{ required: true, message: 'Please select option!' }]}
                    >
                        <Select onChange={handleCategoryChange}>
                            <Option value="applicant">Applicant</Option>
                            <Option value="recruiter">Recruiter</Option>
                        </Select>
                    </Item>
                    <Item
                        name="name"
                        label={categoryType === 'applicant' ? "Name" : "Company Name"}
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input prefix={<InfoCircleOutlined />} placeholder={categoryType === 'applicant' ? "Name" : "Company Name"} />
                    </Item>

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
                        name="contactNumber"
                        label="Contact Number"
                        rules={[
                            { required: true, message: 'Please input your mobile number!' },
                        ]}
                    >
                        <Input prefix={<LockOutlined />} placeholder="Contact Number" />
                    </Item>
                    <Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Item>
                    <Item
                        name="confirmPassword"
                        label="Confirm Password"
                        rules={[{ required: true, message: 'Please input your password again!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                    </Item>
                    {categoryType === 'applicant' ? (
                        <>
                            <Item name="skills" label="Skills">
                                <Select mode="tags" placeholder="Skills">
                                    {skillsData.map((skill) => (
                                        <Option key={skill}>{skill}</Option>
                                    ))}
                                </Select>
                            </Item>
                            <Item 
                            name="bio" 
                            label="Bio (upto 250 words)"
                            rules={[{ required: true, message: 'Please write somehing about yourself!' }]}

                            >
                                <TextArea placeholder="Bio" autoSize={{ minRows: 3, maxRows: 5 }} />
                            </Item>

                            <Item
                                name="resume"
                                label="Upload Resume"
                                getValueFromEvent={normFile}
                                rules={[{ required: true, message: 'Please upload your resume!' }]}>
                                <Upload beforeUpload={() => false}>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>

                            </Item>
                            <Item name="profile"
                                label="Upload Profile Photo"
                                getValueFromEvent={normFile}
                                rules={[{ required: true, message: 'Please upload your profile photo!' }]}>
                                <Upload beforeUpload={() => false}>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </Item>
                        </>
                    ) : (
                        <>
                            <Item name="profile"  getValueFromEvent={normFile} label="Upload Company Logo" rules={[{ required: true, message: 'Please upload company logo!' }]}>
                                <Upload beforeUpload={() => false}>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </Item>

                            <Item 
                            name="bio" 
                            label="Company description (upto 250 words)"
                            rules={[{ required: true, message: 'Please write somehing about yourcompany!' }]}
                            >
                                <TextArea placeholder="Describe your company" autoSize={{ minRows: 3, maxRows: 5 }} />
                            </Item>
                        </>
                    )}
                    <Item>
                        <Button type="primary" htmlType="submit">
                            Signup
                        </Button>
                    </Item>
                    <Item>
                        Already have an account? <Link to='/signin'>Signin </Link>
                    </Item>
                </Form>
            </div>
        </>
    );
};

export default Signup;