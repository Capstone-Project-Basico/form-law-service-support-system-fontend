"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      // Check if user is authenticated
      if (typeof window !== "undefined") {
        // Perform localStorage action
        const userData = localStorage.getItem("userData");
        const user = JSON.parse(userData || "{}");
        if (new Date(user.expiration) < new Date()) {
          // router.push('/login');
        }
      }
    };
    checkAuth();
  }, [router]);

  return children;
};

export default AuthProvider;
