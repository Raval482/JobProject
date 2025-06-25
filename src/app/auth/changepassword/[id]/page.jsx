"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useChangePassword } from "../../../services/mutationServices";
import { toast } from "react-toastify";

const ChangePasswordPage = ({ params }) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const { mutate: changePasswordMutate, isPending } = useChangePassword();

  const onSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("🔐 New password and confirm password do not match!");
      return;
    }

    const body = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    changePasswordMutate(
      { id: params.id, body },
      {
        onSuccess: () => {
          const role = sessionStorage.getItem("role")
          toast.success("✅ Password changed successfully!");
          if (role === "admin") {
            router.push("/admin-page")
          }
          if (role === "provider") {
            router.push("/provider-page")

          } if (role === "user") {
            router.push("/user-page")

          }
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex justify-center items-center">
      <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🔐 Change Password</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Current Password</label>
            <input
              type="password"
              {...register("oldPassword", { required: true })}
              placeholder="Enter current password"
              className="w-full px-4 py-2 border rounded-md bg-white/70 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">New Password</label>
            <input
              type="password"
              {...register("newPassword", { required: true })}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border rounded-md bg-white/70 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", { required: true })}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border rounded-md bg-white/70 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isPending ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
