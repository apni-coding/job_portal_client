export const registerUser = (userData) => {
    return {
        type: 'REGISTER_USER',
        payload: userData
    };
};

export const signinUser = (userData) => {
    console.log("userData is",userData);
    return {
        type: 'SIGNIN_USER',
        payload: userData
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

