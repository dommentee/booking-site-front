"use client";
import { useGlobalContext } from "@/app/context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { User } from "@/app/Helpers/Users";

const page = () => {
  const userContext = useGlobalContext() || null;

  const user: User = userContext?.user || null;

  const router = useRouter();

  if (user) {
    const { userId, firstName, lastName, role } = user;
  }

  useEffect(() => {
    if (!user) {
      router.push("/pages/login");
    }
  }, [user, router]);

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
