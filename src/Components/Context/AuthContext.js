import { createContext, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState([
    {
      name: "Sai Prahlad",
      email: "k.sssprahlad@gmail.com",
      password: "2226@Sai",
      phone: "9346822260",
      address: "Hyderabad, Telangana",
    },
    {
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      password: "Rahul@123",
      phone: "9876543210",
      address: "Bangalore, Karnataka",
    },
    {
      name: "Anita Verma",
      email: "verma@gmail.com",
      password: "Anita@456",
      phone: "9123456789",
      address: "Hyderabad, Telangana",
    },
    {
      name: "Suresh Kumar",
      email: "kumar@gmail.com",
      password: "Suresh@789",
      phone: "9988776655",
      address: "Chennai, Tamil Nadu",
    },
  ]);
  console.log(user, "users");
  return (
    <UserContext.Provider value={{ setUser, user }}>
      {children}
    </UserContext.Provider>
  );
};
