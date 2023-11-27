import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen bg-green-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-green-500 mb-4 mx-auto"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M1.293 8.293a1 1 0 0 1 1.414-1.414L9 13.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7z"
            />
          </svg>
          <h1 className="text-2xl font-semibold mb-2">Signup Successful!</h1>
          <p className="text-gray-600 mb-4">
            Please Check Your Emal To Verify Account
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
