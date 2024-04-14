import { useNavigate } from "react-router-dom";
import { ShowOrders } from "../components/ShowOrders"
import { useAuth } from "../components/AuthProvider";

export const OrderHistory = () => {

    const navigate = useNavigate();
    const { isLoggedIn} = useAuth();


      const handleLogin = () => {
        navigate("/");
      };


    return (
        <>
        {isLoggedIn ? (
            <>
            <ShowOrders/>
            </>
        ) : (
            <div className="not-logged-in">
            <p>Please log in to access your orders</p>
            <button onClick={handleLogin}>Login</button>
            </div>
        )}
        
        </>
    );
}
