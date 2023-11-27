"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/app/Helpers/Api";
import { useGlobalContext } from "@/app/context";

const page = () => {
  const currentApi = api(api);
  const router = useRouter();
  const { saveUser } = useGlobalContext() || {};
  if (!saveUser) {
    return null;
  }

  const defaultForm = {
    email: "",
    password: "",
  };

  //state if tthe form
  const [userCredential, setUserCredential] = useState(defaultForm);
  //set value on form change
  const handleChange = (e: any) => {
    setUserCredential({ ...userCredential, [e.target.name]: e.target.value });
  };

  //state of error messages
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const loginUser = async (userCredential: any) => {
    //make request
    try {
      const response = await fetch(`${currentApi}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userCredential),
      });
      if (response.ok) {
        const data = await response.json();
        saveUser(data.user);
        router.push(`/`);
        return data.user;
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.msg;
        const errorArray = errorMessage.split(",");
        setErrorMessages(errorArray);
        setShowErrorMsg(true);
        throw new Error(errorArray);
      }
    } catch (error: any) {
      if (error) {
        setErrorMessages(error.response.data.msg);
        setShowErrorMsg(true);
        throw new Error(error.response.data.msg);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userCredential.email || !userCredential.password) {
      setErrorMessages(["Pleae fill out missing fields"]);
      setShowErrorMsg(true);
      return;
    }

    try {
      await loginUser(userCredential);

      //router.push("/pages/account");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md max-w-md mx-auto my-20">
      <h3>Login</h3>
      <form
        className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
        onSubmit={handleSubmit}
      >
        {showErrorMsg ? (
          <div>
            {errorMessages.map((error, index) => (
              <div
                className=" bg-red-200 p-1 rounded mt-0.5 text-xs text-red-800 mb-2"
                key={index}
              >
                {error}
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
        <label htmlFor="email">email</label>
        <br />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={userCredential.email}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="email"
        />
        <br />
        <br />
        <label htmlFor="password">password</label>
        <br />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={userCredential.password}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="password"
        />
        <br />
        <br />
        <input
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
          value="SUBMIT"
        ></input>
      </form>

      <div>
        Dont have an account? <Link href="/pages/signup">sign up here</Link>
      </div>
    </div>
  );
};

export default page;
