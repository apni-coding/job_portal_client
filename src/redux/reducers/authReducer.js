import {message } from 'antd';

const initialState = {
    user: null, //this is the user type applicant/recuriter
    isLoggedIn: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SIGNIN_USER':
        // Retrieve userType from localStorage or default to null
        const userType = localStorage.getItem('userType') || null;
        return {
          ...state,
          user: userType,
          isLoggedIn: true
        };
  
      case 'LOGOUT_USER':
        // Clear localStorage when logging out
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        message.success('Logout successfully');
        
        return {
          ...state,
          user: null,
          isLoggedIn: false
        };
  
      // Add a case to check token presence and update isLoggedIn accordingly
      case 'CHECK_TOKEN':
        const token = localStorage.getItem('token');
        const type = localStorage.getItem('userType') || null;

        return {
          ...state,
          isLoggedIn: token ? true : false,
          user: type
        };
  
      default:
        return state;
    }
  };
  
  export default authReducer;
