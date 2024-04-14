
import { useEffect } from "react";
import axios from "axios";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { useAuth } from "../components/AuthProvider";


export const Start = () => {
  const { isLoggedIn, customer, authorize, logout} = useAuth();


  useEffect(() => { 
  }, [authorize, isLoggedIn, customer, logout]);

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
      alert("Tack för din registrering, " + registerData.name);
      console.log(response.data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };


return (
  <>
    {isLoggedIn && customer && (
      <>
        <p>Welcome {customer.name}!</p>
        <h3>Customer info:</h3>
        <p>Address: {customer.street} {customer.streetNumber}</p>
        <p>Postal Code: {customer.postalCode} {""} City: {customer.city}</p>
        <p>Email: {customer.email}</p>
        <button onClick={logout}>Logout</button>
      </>
    )}
    {!isLoggedIn && !customer && (
      <>
        <h2>Login</h2>
        <LoginForm handleLogin={handleLogin} />
        <h2>Register</h2>
        <RegisterForm handleRegister={handleRegister} />
      </>
    )}
  </>
);
}