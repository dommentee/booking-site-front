"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/app/Helpers/Api";
interface Service {
  _id: string; // Replace 'string' with the actual type of _id from your API response
  title: string;
  price: number;
  duration: number;
  // Add other properties as per your API response structure
}

const page = () => {
  const currentApi = api(api);
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${currentApi}/services`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setServices(data.services);
        }
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchServices();
  }, [currentApi]);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Available Services</h1>
      {services.map((service: Service) => (
        <div key={service._id} className="border-b border-gray-200 mb-4 pb-4">
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-gray-600 mb-2">Price: ${service.price}</p>
          <p className="text-gray-600 mb-2">
            Duration: {service.duration} minutes
          </p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out">
            Book Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default page;
