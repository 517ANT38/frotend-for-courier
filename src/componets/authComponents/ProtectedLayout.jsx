import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../security/auth";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  
  
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className='boxPanel'> 
      <Outlet />
    </div>
    

  )
};