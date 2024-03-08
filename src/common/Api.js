export const server = "http://localhost:5000";

const apiList = {
  signin: `${server}/auth/login`,
  signup: `${server}/auth/register`,
  forgotPasswordOtp: `${server}/auth/forgotpasswordotp`,
  verifyOtp: `${server}/auth/verifyotp`,
  updatePassword: `${server}/auth/updatepassword`,

  addJob:`${server}/recruiter/createjob`,

  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
};

export default apiList;
