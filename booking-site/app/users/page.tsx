//rafce
import React from "react";

interface User {
  id: number;
  name: string;
}

const UserPage = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users",
    //for data that may change frequently
    //{ cache: "no-store" }
    //to fetch data from the backend every 10 secs
    { next: { revalidate: 10 } }
    //this is only allowed in the fetch function/ not 3rd party like axios
  );
  const users: User[] = await res.json();
  return (
    <>
      <h1 className="p-5">Users</h1>
      <div className="bg-sky-500">hello</div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </>
  );
};

export default UserPage;
