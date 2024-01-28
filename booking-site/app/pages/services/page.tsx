"use client";
import React, { useEffect, useState } from "react";
import { Service } from "@/app/Helpers/types";
import GetServices from "@/app/Helpers/GetServices";
import BookingModel from "@/app/components/forms/bookingmodel/BookingModel";
import { useGlobalContext } from "@/app/context";
import { User } from "@/app/Helpers/Users";

const page = () => {
  const [services, setServices] = useState<Service[] | null>(null);
  const [showBookingForm, setShowBookingForm] = useState<{
    [key: string]: boolean;
  }>({});
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleClick = (service: Service) => {
    try {
      setSelectedService(service);
      setShowBookingForm((prevState: any) => ({
        ...prevState,
        [service._id]: !prevState[service._id],
      }));
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const userContext = useGlobalContext();
  const user: User = userContext?.user || null;

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
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
              onClick={() => {
                handleClick(service);
              }}
            >
              Book Now
            </button>
            {showBookingForm[service._id] && selectedService && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                <div className="flex flex-col items-center">
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300 ease-in-out w-32 mx-auto mb-4"
                    onClick={() => {
                      handleClick(service);
                    }}
                  >
                    cancle
                  </button>
                  <BookingModel service={service} user={user} />
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>no services</p>
      )}
    </div>
  );
};

export default page;
