"use client";
import { useGlobalContext } from "@/app/context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "@/app/Helpers/Users";

const page = () => {
  //set usercontext
  const userContext = useGlobalContext() || null;
  //get user
  const user: User = userContext?.user || null;
  //set loading state to prevent redirect on refresh
  const [isLoading, setIsLaoding] = useState(true);

  const router = useRouter();

  useEffect(() => {
    //there will call a delay when user navagates to page
    const delayRedirect = setTimeout(() => {
      try {
        if (!user) {
          router.push("/pages/login");
        } else {
          setIsLaoding(false);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    }, 100);
    return () => {
      clearTimeout(delayRedirect);
    };
  }, [user, router]);
  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>Welcome, {user.firstName}!</h1>
          <p>User ID: {user.userId}</p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default page;
