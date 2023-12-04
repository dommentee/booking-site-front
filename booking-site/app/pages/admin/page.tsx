"use client";
import React, { useState } from "react";
import { api } from "@/app/Helpers/Api";

const page = () => {
  const currentApi = api(api);

  const defaultForm = {
    title: "",
    price: "",
    duration: "",
    description: "",
    image: "",
    category: "",
  };

  const [newService, setNewService] = useState(defaultForm);
  const handleChange = (e: any) => {
    setNewService({ ...newService, [e.target.name]: e.target.value });
  };

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const createService = async (newService: any) => {
    //make request
    try {
      const response = await fetch(`${currentApi}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newService),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
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
    if (!newService.title || !newService.price || !newService.duration) {
      setErrorMessages(["Pleae fill out missing fields"]);
      setShowErrorMsg(true);
      return;
    }

    try {
      await createService(newService);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md max-w-md mx-auto my-20">
      <h3>Create new Service</h3>
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
        <label htmlFor="Title">service title</label>
        <br />
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={newService.title}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="service title"
        />
        <br />
        <br />
        <label htmlFor="price">price </label>
        <br />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          value={newService.price}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="price in USD"
        />
        <br />
        <br />
        <label htmlFor="duration">duration in minutes</label>
        <br />
        <input
          type="number"
          name="duration"
          onChange={handleChange}
          value={newService.duration}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="30"
        />
        <br />
        <br />
        <label htmlFor="image">imgage</label>
        <br />
        <input
          type="text"
          name="iamge"
          onChange={handleChange}
          value={newService.image}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="image"
        />
        <br />
        <br />
        <label htmlFor="description">description</label>
        <br />
        <textarea
          name="description"
          onChange={handleChange}
          value={newService.description}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="description"
        />
        <br />
        <br />
        <label htmlFor="category">category</label>
        <br />
        <select
          name="category"
          onChange={handleChange}
          value={newService.category}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select a category</option>
          <option value="hair">Hair</option>
          <option value="makeup">Makeup</option>
        </select>
        <br />
        <br />
        <input
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
          value="SUBMIT"
        ></input>
      </form>
    </div>
  );
};

export default page;
