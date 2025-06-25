"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useApplyJob } from "../../../../services/mutationServices"; // adjust if needed
import { toast } from "sonner";

const ApplyJobPage = () => {
  const { id } = useParams(); // job ID
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const { mutate: applyJob, isPending } = useApplyJob();

  const onSubmit = (formData) => {
    applyJob(
      { ...formData, jobId: id },
      {
        onSuccess: () => {
          toast.success("🎉 Application submitted successfully!");
          reset();
          router.push("/user-page"); // or go back to jobs list
        },
        onError: (err) => {
          toast.error(err?.response?.data?.message || "Failed to apply");
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6 drop-shadow">
          📝 Apply for Job
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-1">
              Message
            </label>
            <textarea
              {...register("message", { required: true })}
              placeholder="Why are you a good fit for this job?"
              className="w-full px-4 py-3 rounded-md border border-gray-300 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white/60"
              rows={5}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition shadow-md"
          >
            {isPending ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyJobPage;
