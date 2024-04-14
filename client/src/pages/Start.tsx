
import { useEffect } from "react";
import axios from "axios";
import { LoginForm } from "../components/LoginForm";
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


return (
  <>
    {isLoggedIn && customer && (
      <>
        <div className="start-page">
          <p>Welcome {customer.name}!</p>

          <button onClick={logout}>Logout</button>
        </div>
      </>
    )}
    {!isLoggedIn && !customer && (
      <>
        <LoginForm handleLogin={handleLogin} />
      </>
    )}
  </>
);
}