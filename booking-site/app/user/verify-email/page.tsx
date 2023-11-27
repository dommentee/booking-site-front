"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/app/Helpers/Api";
import { useSearchParams } from "next/navigation";

const page = () => {
  const currentApi = api(api);
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const verificationToken = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const verifyToken = async () => {
    try {
      const response = await fetch(`${currentApi}/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationToken, email }),
      });
      if (!response.ok) {
        const data = await response.json();
        return data;
      }
      setIsLoading(false);
      setIsVerified(true);
    } catch (error: any) {
      setError(true);
      throw new Error(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (!isVerified) {
      // Call verifyToken only if verification isn't done yet
      verifyToken();
    }
  }, [isVerified]); // Run useEffect when isVerified changes

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return (
      <h4>There was an error, Please double check your varification link</h4>
    );
  }
  return (
    <div>
      email verified
      <Link
        href="/pages/login"
        className="text-blue-500 underline hover:text-blue-700"
      >
        <div className="session-button" id="login">
          login
        </div>
      </Link>
      <Link href="/" className="text-blue-500 underline hover:text-blue-700">
        Go to Homepage
      </Link>
    </div>
  );
};

export default page;
