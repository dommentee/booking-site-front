import { useEffect, useState } from "react";
import { api } from "./Api";

const GetServices = async () => {
  const currentApi = api(api);

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
      return data.services;
    }
  } catch (error: any) {
    console.error(error.message);
  }
};

export default GetServices;
