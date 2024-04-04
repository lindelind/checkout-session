import {useState } from "react";
import axios from "axios";

interface LoginData {
    email: string,
    password: string
}

export const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });


  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        loginData, {
            withCredentials: true
        }
      );
      console.log(response.data);
      // Uppdatera användarstatet eller hantera vidare navigering
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={(e) =>
            setLoginData({
              ...loginData,
              email: e.target.value,
            })
          }
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({
              ...loginData,
              password: e.target.value,
            })
          }
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};
