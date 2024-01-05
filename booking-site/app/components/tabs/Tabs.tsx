import React, { useState } from "react";
import CreateService from "../adminAuthorizedOnly/CreateService";
import EditService from "../adminAuthorizedOnly/EditService";

const Tabs = () => {
  const [tab, setTab] = useState("overview");
  const [update, setUpdated] = useState(false);

  const setUpdate = () => {
    setUpdated(true);
    //set updated back to false to refetch on submit
    setTimeout(() => {
      setUpdated(false);
    }, 2000);
  };
  const handleTabClick = (selectedTab: any) => {
    setTab(selectedTab);
  };
  return (
    <div className="my-6">
      <div className="flex mb-4">
        <button
          onClick={() => handleTabClick("overview")}
          className={`px-4 py-2 mr-2 rounded ${
            tab === "overview"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
        >
          Overview
        </button>
        <button
          onClick={() => handleTabClick("bookings")}
          className={`px-4 py-2 mr-2 rounded ${
            tab === "bookings"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
        >
          Bookings
        </button>
        <button
          onClick={() => handleTabClick("revenue")}
          className={`px-4 py-2 mr-2 rounded ${
            tab === "revenue"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
        >
          Revenue
        </button>
        <button
          onClick={() => handleTabClick("clients")}
          className={`px-4 py-2 mr-2 rounded ${
            tab === "clients"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
        >
          Clients
        </button>
        <button
          onClick={() => handleTabClick("manageServices")}
          className={`px-4 py-2 mr-2 rounded ${
            tab === "createService"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
        >
          Manage Services
        </button>
        {/* <button
          onClick={() => handleTabClick("editService")}
          className={`px-4 py-2 rounded ${
            tab === "editService"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
        >
          Edit Service
        </button> */}
      </div>

      {/* Render content based on selected tab */}
      <div className="bg-gray-100 p-4 rounded">
        {tab === "overview" && <div>Overview content goes here</div>}
        {tab === "bookings" && <div>Bookings content goes here</div>}
        {tab === "revenue" && <div>Revenue content goes here</div>}
        {tab === "clients" && <div>Clients content goes here</div>}
        {tab === "manageServices" && (
          <div>
            <div className="">
              <h3>Service Creater</h3>
              <CreateService setUpdate={setUpdate} />
            </div>
            <div className="">
              <EditService update={update} setUpdate={setUpdate} />
            </div>
          </div>
        )}
        {/* {tab === "editService" && <div>Edit Service content goes here</div>} */}
      </div>
    </div>
  );
};

export default Tabs;
