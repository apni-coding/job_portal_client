import React, { useState } from 'react';
import { Card, Space, Button, Modal, Form, Input, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const JobCard = ({ jobs }) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedJob, setEditedJob] = useState(null);

    const handleEdit = (job) => {
        setEditedJob(job);
        setEditModalVisible(true);
    };

    const handleUpdate = () => {
        // Implement logic to update job details
        console.log('Update job:', editedJob);
        setEditModalVisible(false);
    };

    const handleDelete = (jobId) => {
        // Implement logic to handle delete action
        console.log('Delete job:', jobId);
    };

    return (
        <div>
            {jobs.map(job => (
                <Card
                    key={job._id}
                    title={job.title}
                    style={{ width: 300, marginBottom: 20 }}
                    actions={[
                        <Space>
                            <Button type="link" onClick={() => handleEdit(job)} icon={<EditOutlined />} />
                            <Button type="link" onClick={() => handleDelete(job._id)} icon={<DeleteOutlined />} />
                        </Space>
                    ]}
                >
                    <p><strong>Type:</strong> {job.type}</p>
                    <p><strong>Salary:</strong> {job.salary}</p>
                    <p><strong>Deadline:</strong> {job.applicationDeadline}</p>
                    <p><strong>Number of Openings:</strong> {job.numberOfOpenings}</p>
                    <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
                </Card>
            ))}

            {/* Edit Modal */}
            <Modal
                title="Edit Job"
                visible={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setEditModalVisible(false)}>Cancel</Button>,
                    <Button key="update" type="primary" onClick={handleUpdate}>Update</Button>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Title">
                        <Input value={editedJob?.title} />
                    </Form.Item>
                    <Form.Item label="Description">
                        <TextArea value={editedJob?.description} rows={4} />
                    </Form.Item>
                    {/* Add more fields as needed */}
                    <Form.Item label="Type">
                        <Input value={editedJob?.type} />
                    </Form.Item>
                    <Form.Item label="Salary">
                        <Input value={editedJob?.salary} />
                    </Form.Item>
                    {/* <Form.Item label="Deadline">
                        <DatePicker value={editedJob?.applicationDeadline} />
                    </Form.Item> */}
                    <Form.Item label="Number of Openings">
                        <Input value={editedJob?.numberOfOpenings} />
                    </Form.Item>
                    <Form.Item label="Experience Level">
                        <Input value={editedJob?.experienceLevel} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default JobCard;
