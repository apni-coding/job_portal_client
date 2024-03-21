import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const RecruiterPrivateRoutes = () => {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const userRole = useSelector(state => state.auth.user);

    if (!isLoggedIn) {
        return <Navigate to="/signin" />;
    }
    if (userRole !== 'recruiter' || !userRole) {
        return <Navigate to="/unuthorized" />;
    }
    return (
        isLoggedIn ? <Outlet /> : <Navigate to='/signin' />
    )
};

export default RecruiterPrivateRoutes;
