import axiosService from "./axiosServices"

export const Login = async (body) => {
  const response = await axiosService.post("/login", body)
  return response.data
}


export const Registration = async (body) => {
  const response = await axiosService.post("/registration", body)
  return response.data
}

export const changePassword = async (id, body) => {
  const response = await axiosService.put(`/v1/chnagepassword/${id}`, body)
  return response.data
}


export const createJob = async (body) => {

  const response = await axiosService.post("/v1/jobs/managejob", body);
  return response.data;
};

export const deleteJob = async (id) => {

  const response = await axiosService.delete(`/v1/jobs/managejob/${id}`);
  return response.data;
};

export const updateJob = async (id, data) => {

  const response = await axiosService.put(`/v1/jobs/managejob/${id}`, data);
  return response.data;
};

export const AllJob = async () => {
  const response = await axiosService.get("/v1/jobs/managejob");
  return response.data
}

export const ParticularJob = async (id) => {
  const response = await axiosService.get(`/v1/jobs/managejob/${id}`)
  return response.data
}

export const ProfileView = async (id) => {
  const response = await axiosService.get(`/v1/profile`)
  return response.data
}

export const GetAllData = async () => {
  const response = await axiosService.get("/v1/admin/getalldata")
  return response.data
}

export const deletDatabyAdmin = async (body) => {
  const response = await axiosService.delete("/v1/admin/deletedatabyadmin", {
    data: body
  })
  return response.data
}

export const GetpandingUser = async () => {
  const response = await axiosService.get("/v1/admin/getPandingUser")
  return response.data
}

export const chnageUserStatus = async (body) => {
  const response = await axiosService.put("/v1/admin/changeStatus", body)
  return response.data
}

export const ApplyJob = async (body) => {
  const response = await axiosService.post("/v1/jobs/applyjob", body)
  return response.data
}

export const getAppliedJobs = async () => {
  const response = await axiosService.get("/v1/jobs/appliedjobs");
  return response.data;
};

export const getProviderApplications = async (jobId) => {

 const response = await axiosService.get(`/v1/jobs/get-applications?jobId=${jobId.queryKey[1]}`);
  return response.data;
};

export const updateApplicationStatus = async (body) => {
  const response = await axiosService.put("/v1/jobs/get-applications", body);
  return response.data;
};


export const myjobadmin = async () => {
  const response = await axiosService.get("/v1/jobs/myjob");
  return response.data;
}; 