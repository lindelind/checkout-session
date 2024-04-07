// RegisterForm.tsx
import React, { ChangeEvent, FormEvent, useState } from "react";

interface RegisterData {
  handleRegister: (registerData: { name: string; email: string; password: string }) => void;
}

export const RegisterForm: React.FC<RegisterData> = ({ handleRegister }) => {
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleRegister(registerData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={registerData.name} onChange={handleChange} placeholder="Name" required />
      <input type="email" name="email" value={registerData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={registerData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  );
};
