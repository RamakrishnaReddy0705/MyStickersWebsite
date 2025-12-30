import react,{useEffect} from "react";
import { Navigate,useLocation } from "react-router-dom";
import { useAuth } from "../store/auth-context";
import { Outlet } from "react-router-dom";
export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location=useLocation();
  useEffect(()=>{
    const skipRedirect=sessionStorage.getItem("skipRedirectPath")==="true";
    if(!isAuthenticated && location.pathname!="/login" && !skipRedirect){
      sessionStorage.setItem("redirectedPath",location.pathname);
    }
  },[isAuthenticated,location.pathname]);
  return isAuthenticated ? <Outlet></Outlet> : <Navigate to="/login" />;
}
                                                                                                                 