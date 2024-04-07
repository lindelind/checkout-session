// import { ChangeEvent, useEffect, useState } from "react";
// import axios from "axios";

// interface LoginData {
//   email: string;
//   password: string;
// }

// interface CustomerData {
//   name: string;
//   email: string;
//   password: string;
// }

// export const Start = () => {
//   const [customer, setCustomer] = useState("");
//  const [loginData, setLoginData] = useState<LoginData>({
//    email: "",
//    password: "",
//  });
//   const [registerData, setRegisterData] = useState<CustomerData>({
//     name: "",
//     email: "",
//     password: "",
//   });

//   useEffect(() => {
//     const authorize = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3001/api/auth/authorize",
//           {
//             withCredentials: true,
//           }
//         );

//         if (response.status === 200) {
//           setCustomer(response.data.email);
//           console.log(response.data.email);
//         } else {
//           setCustomer("");
//         }
//       } catch (error) {
//         console.error("Error during authorization:", error);
//       }
//     };

//     authorize();
//   }, []);


//    const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
//     e.preventDefault()
//      try {
//        const response = await axios.post(
//          "http://localhost:3001/api/auth/login",
//          loginData,
//          {
//            withCredentials: true,
//          }
//        );
//        console.log(response.data);
//        // Uppdatera användarstatet eller hantera vidare navigering
//      } catch (error) {
//        console.error("Error during login:", error);
//      }
//    };

//   const handleRegister = async (e: ChangeEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/auth/register",
//         registerData,
//         {
//           withCredentials: true,
//         }
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error during registration:", error);
//     }
//   };

//   const logout = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/auth/logout",
//         null,
//         {
//           withCredentials: true,
//         }
//       );

//       if (response.status === 200) {
//         setCustomer(""); // Uppdatera customer efter utloggning
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <>
//       <h1>{customer ? `Inloggad: ${customer}` : "Utloggad"}</h1>
//       <button onClick={logout}>Logout</button>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           name="email"
//           value={loginData.email}
//           onChange={(e) =>
//             setLoginData({
//               ...loginData,
//               email: e.target.value,
//             })
//           }
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={loginData.password}
//           onChange={(e) =>
//             setLoginData({
//               ...loginData,
//               password: e.target.value,
//             })
//           }
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Login</button>
//       </form>

//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
//         <input
//           type="text"
//           name="name"
//           value={registerData.name}
//           onChange={(e) =>
//             setRegisterData({
//               ...registerData,
//               name: e.target.value,
//             })
//           }
//           placeholder="Name"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           value={registerData.email}
//           onChange={(e) =>
//             setRegisterData({
//               ...registerData,
//               email: e.target.value,
//             })
//           }
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           name="password"
//           value={registerData.password}
//           onChange={(e) =>
//             setRegisterData({
//               ...registerData,
//               password: e.target.value,
//             })
//           }
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//     </>
//   );
// };


// Start.tsx
import  { useEffect, useState } from "react";
import axios from "axios";
import { AuthorizationStatus } from "../components/AuthorizationStatus";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import { NavLink } from "react-router-dom";


export const Start = () => {
  const [customer, setCustomer] = useState("");
  
  
    const authorize = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/auth/authorize", {
          withCredentials: true,
        });

        if (response.status === 200) {
          setCustomer(response.data.email);
          console.log(response.data.email);
        } else {
          setCustomer("");
        }
      } catch (error) {
        console.error("Error during authorization:", error);
      }
    };

useEffect(() => {
  authorize();
}, []);

  const handleLogin = async (loginData: { email: string; password: string }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", loginData, {
        withCredentials: true,
      });
      console.log(response.data);
      setCustomer(response.data.email);
      await authorize();
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRegister = async (registerData: { name: string; email: string; password: string }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/auth/register", registerData, {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/auth/logout", null, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setCustomer("");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
        <NavLink to={"/webshop"}>Gå till Webshop</NavLink>
      <AuthorizationStatus customer={customer} logout={logout} />
      <h2>Login</h2>
      <LoginForm handleLogin={handleLogin} />
      <h2>Register</h2>
      <RegisterForm handleRegister={handleRegister} />
    </>
  );
};
