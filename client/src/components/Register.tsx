import { useState } from "react";
import axios from "axios";

interface CustomerData {
    name: string,
    email: string,
    password: string
}

export const Register = () => {
  const [registerData, setRegisterData] = useState<CustomerData>({
    name: "",
    email: "",
    password: "",
  });


  const registerNewCustomer = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/register",
        registerData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={registerNewCustomer}>
        <input
          type="text"
          value={registerData.name}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              name: e.target.value,
            })
          }
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={registerData.email}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              email: e.target.value,
            })
          }
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({
              ...registerData,
              password: e.target.value,
            })
          }
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};
