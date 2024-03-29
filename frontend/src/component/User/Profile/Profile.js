import React, { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../../layout/Loader/Loader.js'
import MetaData from '../../layout/MetaData.js'
import './Profile.css'
import profile from '../../../images/profile.png'


const Profile = () => {
    const navigate = useNavigate()
    const {user,loading,isAuthenticated} = useSelector(state=>state.user)
    useEffect(() => {
        if (isAuthenticated === false) {
            navigate('/login')
        }
    },[isAuthenticated,navigate])
  return (
      <Fragment>
          {loading ? <Loader /> : (
              <Fragment>
              <MetaData title={`${user.name} 's Profile`} />
              <div className="profileContainer">
                  <div>
                      <h1>My profile</h1>
                      <img src={profile} alt={user.name} />
                      <Link to='/me/update'>Edit Profile</Link>
                  </div>
                  <div>
                      <div>
                          <h4>Full name</h4>
                          <p>{user.name}</p>
                      </div>
                      <div>
                          <h4>Email</h4>
                          <p>{user.email }</p>
                      </div>
                      <div>
                          <Link to='/orders'>My Orders</Link>
                          <Link to='/password/update'>Change password</Link>
                      </div>
                  </div>
              </div>
        </Fragment>
          )}
      </Fragment>
  )
}

export default Profile