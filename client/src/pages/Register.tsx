import axios from "axios";
import { RegisterForm } from "../components/RegisterForm";
import { useState } from "react";


export const Register = () => {

    const [regMessage, setRegMessage] = useState("")

    const handleRegister = async (registerData: RegisterData) => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/auth/register",
          registerData,
          {
            withCredentials: true,
          }
        );
        setRegMessage("Thank you for your registration.");
      } catch (error) {
        console.error("Error during registration:", error);
      }
    };

    return (
      <>
        <h2>Register</h2>
        <RegisterForm handleRegister={handleRegister} />
        <p>{regMessage}</p> 
        
      </>
    );
}