// utils/withAuthRole.js
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const withAuthRole = (Component, allowedRoles = []) => {
  return function ProtectedPage(props) {
    const router = useRouter();

    useEffect(() => {
      const role = sessionStorage.getItem("role");

      if (!role) {
        toast.error("🚫 You must be logged in.");
        router.replace("/auth/login");
        return;
      }

      if (!allowedRoles.includes(role)) {
        toast.error("❌ You are not authorized.");
        router.replace("/login"); // redirect to home or dashboard
      }

      if(role === "admin"){
        router.replace("/admin-page")
      }
      if(role === "provider"){
        router.replace("/provider-page")

      }if(role === "user"){
        router.replace("/user-page")
      }

    }, []);

    return <Component {...props} />;
  };
};

export default withAuthRole;
