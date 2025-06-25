"use client";

import { useGetpandingUser, useChnageUserStatus } from "../../../services/mutationServices";
import { CheckCircle, Ban, Clock } from "lucide-react";

const PendingRequestPage = () => {
  const { data, isLoading, error, refetch } = useGetpandingUser();
  const { mutate: changeStatus } = useChnageUserStatus();

  const handleStatusChange = (userId, newStatus) => {
    changeStatus(
      { userId, status: newStatus },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  if (isLoading) return <div className="text-center mt-10 text-gray-700">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-600">Error loading data</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center drop-shadow-md">
          🕒 Pending User Requests
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.map((user) => (
            <div
              key={user._id}
              className="bg-white/30 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-xl hover:shadow-2xl transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  {user.status === "pending" && <Clock className="text-yellow-500" size={20} />}
                  {user.status === "active" && <CheckCircle className="text-green-600" size={20} />}
                  {user.status === "blocked" && <Ban className="text-red-500" size={20} />}
                  {user.name}
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    user.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : user.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {user.status}
                </span>
              </div>

              <p className="text-sm text-gray-700 mb-1">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Role:</strong> {user.role}
              </p>

              <select
                defaultValue={user.status}
                onChange={(e) => handleStatusChange(user._id, e.target.value)}
                className="w-full px-3 py-2 rounded-md text-sm bg-white shadow-sm border border-gray-300 text-gray-800"
              >
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendingRequestPage;
