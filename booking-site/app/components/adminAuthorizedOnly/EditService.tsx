import { useEffect, useState } from "react";
import GetServices from "@/app/Helpers/GetServices";
import { Service } from "@/app/Helpers/types";
import { api } from "@/app/Helpers/Api";
import EditServiceForm from "../forms/EditServiceForm";

const EditService = (props: any) => {
  const [services, setServices] = useState<Service[] | null>(null);
  const [showEditForm, setShowEditForm] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleClick = (service: Service) => {
    try {
      setSelectedService(service);
      setShowEditForm((prevState: any) => ({
        ...prevState,
        [service._id]: !prevState[service._id],
      }));
    } catch (error: any) {
      console.error(error.message);
    }
  };

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
    if (props.update === true) {
      fetchData();
    }
  }, [props.update]);

  const currentApi = api(api);
  const deleteService = async (serviceId: string) => {
    try {
      const response = await fetch(`${currentApi}/services/${serviceId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        //if response is ok delete service from local sate
        setServices((newServiceList) => {
          return newServiceList
            ? newServiceList.filter((service) => service._id !== serviceId)
            : null;
        });
      } else {
        const errorMsg = await response.json();
        throw new Error(errorMsg);
      }
    } catch (error: any) {
      if (error) {
        throw new Error(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h3>Update service</h3>
      {services && services.length > 0 ? (
        services.map((service: Service) => (
          <div key={service._id} className="border-b border-gray-200 mb-4 pb-4">
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <div className="">
              <button
                className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out w-20"
                onClick={() => {
                  handleClick(service);
                }}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 ease-in-out ml-3 w-20"
                onClick={() => deleteService(service._id)}
              >
                Delete
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out ml-3 w-20">
                launch
              </button>
            </div>
            {showEditForm[service._id] && selectedService && (
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
                  <EditServiceForm
                    service={service}
                    serviceId={service._id}
                    update={props.update}
                    setUpdate={props.setUpdate}
                  />
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No services</p>
      )}
    </div>
  );
};

export default EditService;
