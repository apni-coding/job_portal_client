const initialState = {
    user: null, //this is the user type applicant/recuriter
    isLoggedIn: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTER_USER':

        case 'SIGNIN_USER':
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            };

        case 'FORGOT_PASSWORD':
            return state;

        case 'LOGOUT_USER':
            return {
                ...state,
                user: null,
                isLoggedIn: false
            };
        default:
            return state;
    }
};

export default authReducer;
