import React, { useEffect, useState } from "react";
import { api } from "@/app/Helpers/Api";
import { log } from "console";

const defaultForm = {
  service: "",
  date: "",
  time: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
};

type FormFields = keyof typeof defaultForm;

const BookingModel = (props: any) => {
  const currentApi = api(api);

  let service = props.service.title || null;

  const [newBooking, setNewBooking] = useState(defaultForm);
  const handleChange = (e: any) => {
    const updatedValue =
      e.target.name === "service" ? e.target.value : e.target.value;
    setNewBooking({
      ...newBooking,
      [e.target.name]: updatedValue,
      service: service,
    });
  };

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [successfullBooking, setSuccessfulBooking] = useState(false);

  const createBooking = async (newBooking: any) => {
    setErrorMessages([]);
    setShowErrorMsg(false);
    //make request
    try {
      const response = await fetch(`${currentApi}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newBooking),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        const fieldErrors = errorData.error.errors;
        setErrorMessages([]);

        if (fieldErrors.phone) {
          setErrorMessages((prev) => [...prev, fieldErrors.phone.message]);
        }
        if (fieldErrors.email) {
          setErrorMessages((prev) => [...prev, fieldErrors.email.message]);
        }

        // setShowErrorMsg(true);
      }
    } catch (error: any) {
      if (error) {
        setErrorMessages([error.message]);
        setShowErrorMsg(true);
        throw new Error(error.message);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fieldNames: FormFields[] = Object.keys(newBooking) as FormFields[];
    const areFieldsEmpty = fieldNames.every(
      (fieldName) => !newBooking[fieldName]
    );
    if (areFieldsEmpty) {
      setErrorMessages(["Pleae fill out missing fields"]);
      setShowErrorMsg(true);
      return;
    }

    try {
      await createBooking(newBooking);
      //setNewBooking(defaultForm);

      if (errorMessages) {
        setShowErrorMsg(true);
      }
    } catch (error: any) {
      setErrorMessages([error.message]);
    }
  };
  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-md max-w-md mx-auto my-20">
      <h3>Book {props.service.title}</h3>
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
            <label htmlFor="service Input">service</label>
            <br />
            <input
              type="text"
              id="serviceInput"
              name="service"
              onChange={handleChange}
              value={service}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="service title"
            />
          </div>
          <div className="w-1/2 pr-2">
            <label htmlFor="dateInput">date </label>
            <br />
            <input
              type="date"
              min="2024-01-01"
              id="dateInput"
              name="date"
              onChange={handleChange}
              //   value={selectedDate}
              value={newBooking.date}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="price in USD"
            />
          </div>
        </div>
        <br />
        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="timeInput">time</label>
            <br />
            <input
              type="time"
              min="09:00"
              max="18:00"
              id="timeInput"
              name="time"
              onChange={handleChange}
              //   value={selectedTime}
              value={newBooking.time}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder={"service.duration + start tim"}
            />
          </div>
          <div className="w-1/2 pr-2">
            <label htmlFor="firstNameInput">first name</label>
            <br />
            <input
              type="text"
              id="fistNameInput"
              name="firstName"
              onChange={handleChange}
              value={newBooking.firstName}
              //   value={props.user?.firstName}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="first name"
            />
          </div>
        </div>
        <br />
        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="lastNameInput">last name</label>
            <br />
            <input
              id="lastNameInput"
              name="lastName"
              onChange={handleChange}
              value={newBooking.lastName}
              //   value={props.user?.lastName}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="last name"
            />
          </div>
          <div className="w-1/2 pr-2">
            <label htmlFor="emailInput">email</label>
            <br />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={newBooking.email}
              //   value={props.user?.email}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="email"
            />
          </div>
        </div>
        <label htmlFor="phoneInput">phone</label>
        <br />
        <input
          type="phone"
          name="phone"
          onChange={handleChange}
          value={newBooking.phone}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="phone"
        />
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

export default BookingModel;
