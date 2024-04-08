// LoginForm.tsx
import React, { ChangeEvent, useState } from "react";

interface LoginData {
  handleLogin: (loginData: { email: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginData> = ({ handleLogin }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin(loginData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={loginData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={loginData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};
