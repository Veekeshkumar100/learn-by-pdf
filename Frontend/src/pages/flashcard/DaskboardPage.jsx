

import React, { useEffect, useState } from 'react'
import { getDaskBord } from '../../services/dashBord'
const DaskboardPage = () => {
  const [dashbordData,SetdashbordData]=useState('')
  const [loading,Steloading]=useState('')

       useEffect(()=>{
         const fatchDocumnetData=async()=>{
          const response= await getDaskBord();
          console.log(response);
         }
       },[])



  return (
    <div className='text-amber-600 text-3xl p-1 bg-amber-800'>
      <p>veekes kumar</p>
    </div>
  )
}

export default DaskboardPage