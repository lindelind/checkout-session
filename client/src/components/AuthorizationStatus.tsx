import { useAuth } from "./AuthProvider";

export const AuthorizationStatus = () => {
  const { isLoggedIn, logout, customer } = useAuth();

  return (
    <div>
      <h4>{isLoggedIn ? `Inloggad: ${customer?.name}` : "Ej Inloggad"}</h4>
      {isLoggedIn && logout && <button onClick={logout}>Logout</button>}
    </div>
  );
};

export default AuthorizationStatus;
