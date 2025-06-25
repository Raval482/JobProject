"use client";

import React from "react";
import { useAppliedJobs } from "../../../services/mutationServices";
import {
  Briefcase,
  MapPin,
  DollarSign,
  CalendarDays,
  UserCheck,
  UserX,
  Clock,
  Info
} from "lucide-react";

const AppliedJobsPage = () => {
  const { data, isLoading, error } = useAppliedJobs();

  if (isLoading) return <div className="text-center mt-10 text-gray-700">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">Error loading data</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12 drop-shadow-lg">
          🎯 My Job Applications
        </h1>

        {data?.data?.length === 0 ? (
          <p className="text-center text-lg text-gray-700">No job applications found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {data?.data?.map((application) => {
              const statusColor =
                application.status === "approved"
                  ? "text-green-600"
                  : application.status === "rejected"
                  ? "text-red-600"
                  : "text-yellow-600";

              const StatusIcon =
                application.status === "approved"
                  ? UserCheck
                  : application.status === "rejected"
                  ? UserX
                  : Clock;

              return (
                <div
                  key={application._id}
                  className="bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-white/30 shadow-xl hover:shadow-2xl transition-all"
                >
                  <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                    {application.jobId?.title}
                  </h2>

                  <div className="space-y-1 text-sm text-gray-800">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {application.jobId?.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      {application.jobId?.salary || "Not specified"}
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-rose-600" />
                      Applied on: {new Date(application.createdAt).toLocaleDateString()}
                    </p>
                    <p className={`flex items-center gap-2 font-medium ${statusColor}`}>
                      <StatusIcon className="w-4 h-4" />
                      Status: {application.status}
                    </p>

                    {application.status === "rejected" && application.rejectionMessage && (
                      <p className="mt-2 text-red-600 italic text-sm">
                        <strong>Reason:</strong> {application.rejectionMessage}
                      </p>
                    )}

                    <p className="flex items-center gap-2 text-gray-700 text-sm mt-2">
                      <Info className="w-4 h-4 text-sky-600" />
                      Reviewed by: <span className="font-medium">{application.reviewedBy?.name || "Admin"}</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobsPage;
