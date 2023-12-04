"use client";
import React, { useContext, useState, useEffect } from "react";
import { api } from "@/app/Helpers/Api";

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  role: string;
}
interface AppContextValue {
  saveUser: (user: User) => void;
  user: any;
  removeUser: any;
}

const AppContext = React.createContext<AppContextValue | undefined>(undefined);

const AppProvider = ({ children }: { children: any }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const currentApi = api(api);

  const saveUser = (user: any) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  //because the token is http only,
  //accessing it proves to be dificult at the moment to preventthe fetchUser from running unless the token is avaliable
  //this will run on page refresh /after logout
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${currentApi}/users/showMe`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (data) {
            saveUser(data.payload.user);
          } else {
            console.error("Empty response or invalid JSON");
          }
        }
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchUser();
  }, [currentApi]);

  return (
    <AppContext.Provider
      value={{
        saveUser,
        user,
        removeUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
