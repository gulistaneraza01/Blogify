import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Required({ children }) {
  const { auth } = useAuth();
  const { pathname } = useLocation();
  if (auth) {
    return <>{children}</>;
  }
  return <Navigate to="/login" state={{ toRedirect: pathname }} replace />;
}

export default Required;
