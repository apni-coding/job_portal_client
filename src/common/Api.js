export const server = "http://localhost:5000";

const apiList = {
  signin: `${server}/auth/login`,
  signup: `${server}/auth/register`,
  forgotPasswordOtp: `${server}/auth/forgotpasswordotp`,
  verifyOtp: `${server}/auth/verifyotp`,
  updatePassword: `${server}/auth/updatepassword`,

  addJob:`${server}/recruiter/createjob`,
  getmyJob: `${server}/recruiter/getmyjob`, 
  getJobs:`${server}/applicant/alljob`,
  applyJob: `${server}/applicant/applyjob`,
  jobsWithApplicationCount:`${server}/recruiter/jobs-with-application-count`,
  getApplicationByJobId:`${server}/recruiter/get-application-by-jobid`,
  applicationAction: `${server}/recruiter/applicationaction`,
  appliedJobs: `${server}/applicant/appliedJobs`,
  
  
  uploadResume: `${server}/upload/resume`,
  uploadProfileImage: `${server}/upload/profile`,
  jobs: `${server}/api/jobs`,
  applications: `${server}/api/applications`,
  rating: `${server}/api/rating`,
  user: `${server}/api/user`,
  applicants: `${server}/api/applicants`,
};

export default apiList;
