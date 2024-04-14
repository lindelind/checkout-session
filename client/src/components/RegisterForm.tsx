
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

interface RegisterData {
  handleRegister: (registerData: {
    name: string;
    email: string;
    password: string;
    street: string;
    streetNumber: string;
    postalCode: string;
    city: string;
  }) => void;
}
export const RegisterForm: React.FC<RegisterData> = ({ handleRegister }) => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    street: "",
    streetNumber: "",
    postalCode: "",
    city: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister(registerData);

     setRegisterData({
       name: "",
       email: "",
       password: "",
       street: "",
       streetNumber: "",
       postalCode: "",
       city: "",
     });
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={registerData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <br />
      <input
        type="email"
        name="email"
        value={registerData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <br />
      <input
        type="password"
        name="password"
        value={registerData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <br />
      <input
        type="text"
        name="street"
        value={registerData.street}
        onChange={handleChange}
        placeholder="StreetName"
        required
      />
      <br />
      <input
        type="text"
        name="streetNumber"
        value={registerData.streetNumber}
        onChange={handleChange}
        placeholder="StreetNumber"
        required
      />
      <br />
      <input
        type="text"
        name="postalCode"
        value={registerData.postalCode}
        onChange={handleChange}
        placeholder="Postal Code"
        required
      />
      <br />
      <input
        type="text"
        name="city"
        value={registerData.city}
        onChange={handleChange}
        placeholder="City"
        required
      />
      <br />
      <button type="submit">Register</button>
      <p className="login-here">
          Already a customer?{" "}
          <Link className="login-link" to={"/"}>
            Click here to login
          </Link>
        </p>
    </form>
  );
};