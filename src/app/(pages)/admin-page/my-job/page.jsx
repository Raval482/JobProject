"use client";

import React from "react";
import { useMyJobAdmin } from "../../../services/mutationServices";
import { useDeleteJob } from "../../../services/mutationServices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";


const AdminJobList = () => {
  const { data, isLoading, isError } = useMyJobAdmin();



  const router = useRouter();

  const { mutate: deleteJob } = useDeleteJob();

  if (isLoading) return <div className="text-center mt-10">Loading jobs...</div>;
  if (isError) return <div className="text-center text-red-600">Failed to load jobs.</div>;
  

  return (
    <div className="p-6 max-w-6xl mx-auto mt-14 ">
      <h1 className="text-3xl font-bold mb-6 text-center">🛠 Admin Job Management</h1>

      <div className="grid gap-6">
        {data?.data?.length === 0 ? (
          <p className="text-gray-600 text-center">No jobs posted yet.</p>
        ) : (
          data.data.map((job) => (
            <div
              key={job._id}
              className="p-5 bg-white border rounded-2xl shadow-md flex justify-between items-start gap-4"
            >
              <Link href={`/admin-page/jobApplication/${job._id}`}>
                <h2 className="text-xl font-semibold text-blue-700">{job.title}</h2>
                <p className="text-gray-600">{job.company} • {job.location}</p>
                <p className="text-sm text-gray-500 mt-1">{job.type} • ₹{job.salary}</p>
                <p className="text-sm mt-2 text-gray-800">{job.description}</p>
              </Link>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => router.push(`/admin-page/update-job/${job._id}`)}
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md"
                >
                  ✏️ Update
                </button>
                <button
                  onClick={() => {
                    if (confirm("Are you sure to delete this job?")) {
                      deleteJob(job._id);
                    }
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminJobList;
