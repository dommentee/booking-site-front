"use client";
import React, { useEffect, useState } from "react";
import { Service } from "@/app/Helpers/types";
import GetServices from "@/app/Helpers/GetServices";

const page = () => {
  const [services, setServices] = useState<Service[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedServices = await GetServices();
        setServices(fetchedServices);
      } catch (error: any) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Available Services</h1>
      {services && services.length > 0 ? (
        services.map((service: Service) => (
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
        ))
      ) : (
        <p>no services</p>
      )}
    </div>
  );
};

export default page;
