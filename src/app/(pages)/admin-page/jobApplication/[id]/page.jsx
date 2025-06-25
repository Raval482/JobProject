"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useGetProviderApplications } from "../../../../services/mutationServices";
import { useMutation } from "@tanstack/react-query";
import { updateApplicationStatus } from "../../../../services/apiRoute";
import { toast } from "sonner";
import { X } from "lucide-react";

const AppliedJobsPage = () => {
  const { id: jobId } = useParams(); // jobId from URL

  const { data, isLoading, error, refetch } = useGetProviderApplications(jobId);

  const [showModal, setShowModal] = useState(false);
  const [rejectionNote, setRejectionNote] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);

  const { mutate: updateStatus } = useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: () => {
      toast.success("Application status updated successfully");
      setShowModal(false);
      setRejectionNote("");
      refetch();
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });

  const handleStatusChange = (app, status) => {
    if (status === "rejected") {
      setSelectedApp(app);
      setShowModal(true);
    } else {
      updateStatus({
        applicationId: app._id,
        status,
      });
    }
  };

  const submitRejection = () => {
    if (!rejectionNote.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    updateStatus({
      applicationId: selectedApp._id,
      status: "rejected",
      rejectionMessage: rejectionNote,
    });
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error loading applications</div>;

  const applications = data?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          🧾 Applications for this Job  
        </h1>

        {applications.length === 0 ? (
          <p className="text-center text-lg text-gray-700">No applications found for this job.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white/30 backdrop-blur-md p-6 rounded-xl border border-white/40 shadow-xl"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold text-gray-900">
                    {application.user?.name || "Unnamed"}
                  </h2>
                  <span
                    className={`px-3 py-1 text-sm rounded-full font-semibold ${
                      application.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : application.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {application.status}
                  </span>
                </div>

                <p className="text-sm text-gray-700">
                  <strong>Email:</strong> {application.user?.email || "N/A"}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Message:</strong> {application.message || "No message provided"}
                </p>

                {application.status === "rejected" && application.rejectionMessage && (
                  <p className="text-sm mt-2 text-red-500 italic">
                    <strong>Reason:</strong> {application.rejectionMessage}
                  </p>
                )}

                <div className="mt-4">
                  <label className="text-sm text-gray-600 font-semibold mb-1 block">
                    Change Status
                  </label>
                  <select
                    defaultValue={application.status}
                    onChange={(e) => handleStatusChange(application, e.target.value)}
                    className="w-full p-2 rounded-md border border-gray-300 text-sm bg-white shadow-sm"
                  >
                    <option value="pending" className="text-yellow-600">Pending</option>
                    <option value="approved" className="text-green-600">Approved</option>
                    <option value="rejected" className="text-red-600">Rejected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md mx-auto shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-red-600">Rejection Reason</h3>
            <textarea
              rows="4"
              value={rejectionNote}
              onChange={(e) => setRejectionNote(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              placeholder="Please provide the reason for rejection..."
            ></textarea>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={submitRejection}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedJobsPage;
