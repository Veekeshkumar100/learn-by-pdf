import React from 'react'
import {Navigate} from "react-router-dom";
import { Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Applayout from '../layout/Applayout';
import Loaderforloading from '../../utils/loader';

export default function ProtectedRoute( ) {
  const {isAuthenticat,lodding}=useAuth()


  if (lodding) {
    return (
     <Loaderforloading/>
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
