import { ApiContext } from '@presentation/contexts'
import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext)
  const auth = getCurrentAccount!()?.accessToken !== undefined
  return auth ? <Outlet /> : <Navigate replace to="/login" />
}

export default PrivateRoute
