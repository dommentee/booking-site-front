import React, { useEffect, useState } from "react";
import { api } from "@/app/Helpers/Api";
import { Service } from "@/app/Helpers/types";
import { log } from "console";

interface EditServiceFormProps {
  service: Service;
  serviceId: string;
}

const EditServiceForm = (props: any) => {
  const currentApi = api(api);
  let [service, setService] = useState({ ...props.service });
  const handleChange = (e: any) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setService({ ...props.service });
  }, [props.service]);

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const updateService = async (serviceId: string, updatedService: any) => {
    try {
      const response = await fetch(`${currentApi}/services/${serviceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatedService),
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
    if (!service.title || !service.price || !service.duration) {
      setErrorMessages(["Pleae fill out missing fields"]);
      setShowErrorMsg(true);
      return;
    }

    try {
      await updateService(props.serviceId, service);
      props.setUpdate();
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <>
      <h3>service editor</h3>
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
        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="titleInput">service title</label>
            <br />
            <input
              type="text"
              id="titleInput"
              name="title"
              onChange={handleChange}
              value={service.title}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="service title"
            />
          </div>
          <div className="w-1/2 pr-2">
            <label htmlFor="priceInput">price </label>
            <br />
            <input
              type="number"
              id="priceInput"
              name="price"
              onChange={handleChange}
              value={service.price}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="price in USD"
            />
          </div>
        </div>
        <br />
        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="durationInput">duration in minutes</label>
            <input
              type="number"
              id="durationInput"
              name="duration"
              onChange={handleChange}
              value={service.duration}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="30"
            />
          </div>
          <div className="w-1/2 pr-2">
            <label htmlFor="imageInput">image</label>
            <input
              type="text"
              id="imageInput"
              name="image"
              onChange={handleChange}
              value={service.image}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="image"
            />
          </div>
        </div>
        <br />
        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="descriptionInput">description</label>
            <br />
            <textarea
              name="description"
              id="descriptionInput"
              onChange={handleChange}
              value={service.description}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="description"
            />
          </div>
          <div className="w-1/2 pr-2">
            <label htmlFor="categoryInput">category</label>
            <br />
            <select
              name="category"
              id="categoryInput"
              onChange={handleChange}
              value={service.category}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a category</option>
              <option value="hair">Hair</option>
              <option value="makeup">Makeup</option>
            </select>
          </div>
        </div>
        <br />
        <input
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
          value="SUBMIT"
        ></input>
      </form>
    </>
  );
};

export default EditServiceForm;
