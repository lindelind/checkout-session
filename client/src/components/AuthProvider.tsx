// AuthProvider.js
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthValues<customerData>>({
  isLoggedIn: false,
  customer: null,
  authorize: async () => {},
  logout: async () => {}
});


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children}: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customer, setCustomer] = useState<customerData| null >(null);

  const authorize = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/auth/authorize",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
        setCustomer(response.data);
      } else {
        setIsLoggedIn(false);
        setCustomer(null);
      }
    } catch (error) {
      console.error("Error during authorization:", error);
      setIsLoggedIn(false);
      setCustomer(null);
    }
  };

  const logout = async () => {
    try {
      await axios.post("http://localhost:3001/api/auth/logout", null, {
        withCredentials: true,
      });

      setIsLoggedIn(false);
      window.location.reload()
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    authorize();
  }, []);

 

  const authValues = {
    isLoggedIn,
    customer,
    authorize,
    logout,
  };

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};
