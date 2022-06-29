import { ApiContext } from '@presentation/contexts'
import { Navigate, Outlet } from 'react-router-dom'
import React, { useContext } from 'react'

const PrivateRoute: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext)
  const auth = getCurrentAccount!()?.accessToken !== undefined
  return auth ? <Outlet /> : <Navigate replace to="/login" />
}

export default PrivateRoute
