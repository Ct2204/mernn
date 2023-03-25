import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Route,Redirect } from 'react-router'
import { Navigate,Outlet} from 'react-router-dom'

const ProtectedRoute = () => {
    const {isAuthenticated,user} = useSelector(state=>state.user)
    return (
        isAuthenticated ? <Outlet/> : <Navigate to = '/login'/>
    )
      
      
  
}

export default ProtectedRoute