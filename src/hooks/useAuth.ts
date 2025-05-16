"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      if (email && password) {
        Cookies.set("auth_token", "demo_token", { expires: 7 });
        router.push("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      if (email && password) {
        // Successful signup but don't set a cookie yet
        router.push("/login");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("auth_token");
    router.push("/login");
  };

  return { login, signup, logout, loading, error };
};
