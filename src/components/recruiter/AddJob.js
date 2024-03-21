import { useState } from 'react';
import { Typography, Input, Button, Select, Form, Upload, DatePicker, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import apiList from '../../common/Api';
import { callApi } from '../../common/CallApi';
const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;

const AddJob = () => {
    const [form] = Form.useForm();
    const [token, setToken] = useState(localStorage.getItem('token'));
    // Function to handle form submission
    const handleSubmit = async (values) => {
        try {
            console.log(values)
            // Include token in the request
            const response = await callApi('post', apiList.addJob, values, token);
            console.log('create job', response);
            message.success(response.message || 'Create job successfully');
        } catch (error) {
            console.log('error while creating job', error);
            message.error(error.error);
        }
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };
    const disabledDate = (current) => {
        // Disable dates before today
        return current && current < moment().endOf('day');
    };
    return (
        <>
            <div style={{ padding: '60px' }}>
                <Typography variant="h3" component="h2">
                    Add Job
                </Typography>
                <Form
                    form={form}
                    name="addjob_form"
                    onFinish={handleSubmit}
                    style={{ marginTop: '24px' }}
                >
                    <Item
                        name="title"
                        label="Job Title"
                        rules={[{ required: true, message: 'Please input job title!' }]}
                    >
                        <Input placeholder="Job Title" />
                    </Item>
                    <Item
                        name="skills"
                        label="Skills"
                        rules={[{ required: true, message: 'Please input job skills!' }]}
                    >
                        <Select mode="tags" placeholder="Skills">
                            {/* Options for skills */}
                        </Select>
                    </Item>
                    <Item
                        name="type"
                        label="Type"
                        initialValue={'full'}
                        rules={[{ required: true, message: 'Please select job type!' }]}
                    >
                        <Select>
                            <Option value="full">Full-time</Option>
                            <Option value="part">Part-time</Option>
                            <Option value="contract">Contract</Option>
                        </Select>
                    </Item>

                    <Item
                        name="duration"
                        label="Duration"
                        initialValue={'flexible'}
                        rules={[{ required: true, message: 'Please select duration!' }]}
                    >
                        <Select>
                            <Option value="flexible">Flexible</Option>
                            <Option value="6month">6 Months</Option>
                            <Option value="1year">1 Year</Option>
                            <Option value="2years">2 Years</Option>
                        </Select>
                    </Item>
                    <Item
                        name="salary"
                        label="Salary"
                        rules={[{ required: true, message: 'Please input job salary!' }]}
                    >
                        <Input prefix="₹" placeholder="Salary" />
                    </Item>
                    <Item
                        name="applicationDeadline"
                        label="Application Deadline"
                        rules={[{ required: true, message: 'Please input application deadline!' }]}
                    >
                        <DatePicker
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            format="YYYY-MM-DD HH:mm:ss"
                            placeholder="Select Date and Time"
                            disabledDate={disabledDate}
                        />
                    </Item>

                    <Item
                        name="numberOfOpenings"
                        label="Number of Openings"
                        rules={[{ required: true, message: 'Please input number of openings!' }]}
                    >
                        <Input placeholder="Number of Openings" />
                    </Item>
                    <Item
                        name="location"
                        label="Location"
                        rules={[{ required: true, message: 'Please input job location!' }]}
                    >
                        <Input placeholder="Location" />
                    </Item>
                    <Item
                        name="experienceLevel"
                        label="Experience Level"
                        rules={[{ required: true, message: 'Please input experience level!' }]}
                    >
                        <Input placeholder="Experience Level" />
                    </Item>
                    <Item
                        name="educationRequirements"
                        label="Education Requirements"
                        rules={[{ required: true, message: 'Please input education requirements!' }]}
                    >
                        <Input placeholder="Education Requirements" />
                    </Item>
                    <Item
                        name="benefits"
                        label="Benefits"
                    >
                        <TextArea placeholder="Benefits" autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Item>
                    <Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: 'Please input job description!' }]}
                    >
                        <TextArea placeholder="Description" autoSize={{ minRows: 3, maxRows: 5 }} />
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">
                            Add Job
                        </Button>
                    </Item>
                </Form>
            </div>
        </>
    );
};

export default AddJob;
