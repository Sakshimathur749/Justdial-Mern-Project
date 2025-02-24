import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/login"); 
    } else if (role === "vendor") {
      navigate("/vendor/create"); 
    } 
  }, [navigate]);

  return children;
};
export default ProtectedRoute