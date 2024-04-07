import React from "react";

interface AuthData {
  customer: string;
  logout?: () => void; // <-- logout-funktionen är nu valfri
}

export const AuthorizationStatus: React.FC<AuthData> = ({
  customer,
  logout,
}) => {
  return (
    <div>
      <h1>{customer ? `Inloggad: ${customer}` : "Utloggad"}</h1>
      {logout && <button onClick={logout}>Logout</button>}{" "}
    </div>
  );
};
