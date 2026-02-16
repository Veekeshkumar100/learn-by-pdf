import React from 'react'
import {Navigate} from "react-router-dom";
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Applayout from '../layout/Applayout';

export default function ProtectedRoute( ) {
  const {isAuthenticat,loading}=useAuth()


  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }
  if (!isAuthenticat) {
    return <Navigate to="/login" replace/>
  }

  return (
         <Applayout>
        <Outlet/>
         </Applayout>  
 
  )
}
