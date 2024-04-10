// Start.js
import { useEffect } from "react";
import axios from "axios";
import { AuthorizationStatus } from "../components/AuthorizationStatus";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { NavLink } from "react-router-dom";
import { useAuth } from "../components/AuthProvider";

export const Start = () => {
  const { isLoggedIn, customer, authorize} = useAuth();

  useEffect(() => {
  }, [authorize, isLoggedIn, customer]);

  const handleLogin = async (loginData: LoginData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        loginData,
        {
          withCredentials: true,
        }
      );
      
      await authorize();
      console.log("inloggad:" + response.data);
    }catch(error){
      console.error("Error during login:", error);
    }
  };

  const handleRegister = async (registerData:RegisterData) => {
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
      <NavLink to={"/webshop"}>Gå till Webshop</NavLink>
      <AuthorizationStatus />
      <h2>Login</h2>
      <LoginForm handleLogin={handleLogin} />
      <h2>Register</h2>
      <RegisterForm handleRegister={handleRegister} />
    </>
  );
};
