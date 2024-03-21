export const registerUser = (userData) => {
    return {
        type: 'REGISTER_USER',
        payload: userData
    };
};

export const signinUser = (userType) => {
    console.log("userData is",userType);
    return {
        type: 'SIGNIN_USER',
        payload: userType
    };
};

export const forgotPassword = (email) => {
    return {
        type: 'FORGOT_PASSWORD',
        payload: email
    };
};


export const logoutUser = () => {
    return {
        type: 'LOGOUT_USER'
    };
};

export const checkToken = () => {
    return {
        type: 'CHECK_TOKEN'
    };
};

