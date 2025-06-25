import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AllJob, ApplyJob, GetAllData, GetpandingUser, Login, ParticularJob, ProfileView, Registration, changePassword, chnageUserStatus, createJob, deletDatabyAdmin, deleteJob, getAppliedJobs, getProviderApplications, myjobadmin, updateApplicationStatus, updateJob } from "./apiRoute"
import { toast } from "react-toastify"



export const useRegisterMutation = () => {

    return useMutation({
        mutationKey: ["registration"],
        mutationFn: async (body) => {
            return await Registration(body)
        }
    })
}

export const useLoginMutation = () => {
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (body) => {
            return await Login(body)
        }
    })
}



export const useCreateJobMutation = () => {
    return useMutation({
        mutationKey: ["createJob"],
        mutationFn: async (body) => {
            return await createJob(body);
        }
    });
};

export const useGetAllJobs = () => {
    return useQuery({
        queryKey: ['showalljob'],
        queryFn: AllJob
    })
}

export const useParticularJob = (id) => {
    return useQuery({
        queryKey: ["particularjob", id],
        queryFn: () => ParticularJob(id),
        enabled: !!id
    })
}

export const useProfileView = () => {
    return useQuery({
        queryKey: ["profile"],
        queryFn: ProfileView
    })
}


export const useDeleteJob = () => {
const queryClientss = useQueryClient();

    return useMutation({
        mutationKey: ['deletepost'],
        mutationFn: deleteJob,
        onSuccess: (data) => {
            if (data.success) {
                toast.success("🗑️ Job deleted successfully");
                queryClientss.invalidateQueries(["admindata"]);
            }

        },
    });
}

export const useUpdateJob = () => {
    return useMutation({
        mutationKey: ['updatePost'],
        mutationFn: () => updateJob(id, body)
    })
}

export const useChangePassword = () => {
    return useMutation({
        mutationKey: ['chnagepassword'],
        mutationFn: ({ id, body }) => changePassword(id, body)
    })
}

export const useGetAllData = () => {
    return useQuery({
        queryKey: ["adminallData"],
        queryFn: GetAllData
    })
}


export const useDeletDatabyAdmin = () => {
    return useMutation({
        mutationKey: ['deletebyuser'],
        mutationFn: deletDatabyAdmin
    })
}


export const useGetpandingUser = () => {
    return useQuery({
        queryKey: ["pandinguser"],
        queryFn: GetpandingUser
    })
}

export const useChnageUserStatus = () => {
    return useMutation({
        mutationKey: ["userStatusChange"],
        mutationFn: chnageUserStatus
    })
}

export const useApplyJob = () => {
    return useMutation({
        mutationKey: ["applyjob"],
        mutationFn: ApplyJob
    })
}

export const useAppliedJobs = () => {
    return useQuery({
        queryKey: ["appliedJobs"],
        queryFn: getAppliedJobs
    });
}

export const useGetProviderApplications = (jobId) => {
    return useQuery({
        queryKey: ["providerApplications", jobId],
        queryFn: getProviderApplications,
        enabled: !!jobId
    });
};

export const useUpdateApplicationStatus = () => {
    return useMutation({
        mutationKey: ["update-application-status"],
        mutationFn: updateApplicationStatus
    });
};

export const useMyJobAdmin = () => {
    return useQuery({
        queryKey: ["admindata"],
        queryFn: myjobadmin
    })
}