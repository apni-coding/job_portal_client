import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
    const navigate = useNavigate()
    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" onClick={handleGoHome}>Go Home</Button>}
        />
    );
}

export default Unauthorized;
