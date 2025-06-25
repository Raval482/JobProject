"use client";

import React from "react";
import { useGetAllData, useDeletDatabyAdmin } from "../../services/mutationServices";
import { toast } from "sonner";
import withAuthRole from "../../../../utils/withAuthRole";

const AdminDashboard = () => {
  const { data, isLoading, refetch } = useGetAllData();
  const deleteMutation = useDeletDatabyAdmin();

  const handleDelete = (id, type) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete this ${type}?`);
    if (!confirmDelete) return;

    deleteMutation.mutate(
      { id, type },
      {
        onSuccess: () => {
          toast.success(`${type} deleted successfully`);
          refetch();
        },
        onError: (error) => {
          toast.error(error?.response?.data?.message || "Delete failed");
        },
      }
    );
  };

  if (isLoading) return <div className="text-dark">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 p-8 text-dark">
      <h1 className="text-4xl font-bold text-center mb-12 text-sky-400 drop-shadow-md">
        ⚙️ Admin Dashboard
      </h1>

      {/* Users Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-semibold mb-6 text-dark/90">👥 Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.userData?.map((user) => (
            <div
              key={user._id}
              className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-lg hover:shadow-2xl transition"
            >
              <p><span className="font-semibold text-sky-600">Name:</span> {user?.name}</p>
              <p><span className="font-semibold text-sky-600">Email:</span> {user?.email}</p>
              <p><span className="font-semibold text-sky-600">Role:</span> {user?.role}</p>
              <p><span className="font-semibold text-sky-600">Status:</span> {user?.status}</p>
              <button
                onClick={() => handleDelete(user._id, "user")}
                className="mt-4 px-4 py-2 bg-red-500/90 hover:bg-red-600 text-white font-semibold rounded-md transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Jobs Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-dark/90">💼 Job Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.jobData?.map((job) => (
            <div
              key={job?._id}
              className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-lg hover:shadow-2xl transition"
            >
              <p><span className="font-semibold text-emerald-600">Title:</span> {job?.title}</p>
              <p><span className="font-semibold text-emerald-600">Company:</span> {job?.company}</p>
              <p><span className="font-semibold text-emerald-600">Location:</span> {job?.location}</p>
              <p><span className="font-semibold text-emerald-600">Status:</span> {job?.status}</p>
              <button
                onClick={() => handleDelete(job?._id, "job")}
                className="mt-4 px-4 py-2 bg-red-500/90 hover:bg-red-600 text-white font-semibold rounded-md transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withAuthRole(AdminDashboard, ["admin"]);;
