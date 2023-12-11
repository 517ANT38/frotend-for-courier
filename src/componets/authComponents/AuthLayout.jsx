import { useLoaderData, useOutlet,Await, useAsyncError, Outlet } from "react-router-dom";
import { AuthProvider } from "../../security/auth";

export const AuthLayout = () => {

  return (
    
    
        <AuthProvider ><Outlet /></AuthProvider>
      
   
  );
};
