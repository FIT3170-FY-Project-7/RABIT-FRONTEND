import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from '../../content/Auth/UserContext'

const RequireAuth = () => {
    
  const { enforceLogin } = useUserContext()
    
    const isAuth = enforceLogin()
    
    return(
      useEffect(() => {
        isAuth ? <Outlet /> : <Navigate to="/login"/>
      })
    )  
  }
export default RequireAuth