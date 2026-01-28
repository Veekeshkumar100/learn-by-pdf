import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ProtectedRoute( ) {
  const isAuthenticated = false
  const loading = false

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <Applayout>
        <Outlet/>
    </Applayout>
  )
}
