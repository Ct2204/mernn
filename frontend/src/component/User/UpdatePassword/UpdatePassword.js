import React, { Fragment,useState,useEffect } from 'react'
import './UpdatePassword.css'
import Loader from '../../layout/Loader/Loader.js'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../../layout/MetaData.js'


import { useDispatch, useSelector } from 'react-redux'
import {clearErrors,loadUser,updatePassword} from '../../../actions/userAction'
import {useAlert} from 'react-alert'
import { UPDATE_PASSWORD_RESET } from '../../../constants/userConstants.js'
import LockOpenIcon from '@material-ui/icons/LockOpen.js'
import LockIcon from '@material-ui/icons/Lock.js'
import VpnKeyIcon from '@material-ui/icons/VpnKey.js'

const UpdatePassword = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const nevigate = useNavigate()

   
    const {error, loading, isUpdated} = useSelector(state => state.profile)
    
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [comfirmPassword, setComfirmPassword] = useState('')
    
 
    
    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('oldPassword',oldPassword)
        myForm.set('newPassword',newPassword)
        myForm.set('comfirmPassword',comfirmPassword)
       
        dispatch(updatePassword(myForm))
    }



    useEffect(() => { 

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
   
        if (isUpdated) {
            alert.success('Profile Updated Successfully')
            dispatch(loadUser())
            nevigate('/account')
            dispatch({
                type:UPDATE_PASSWORD_RESET,
            })
        }
    },[dispatch,error,alert,isUpdated])

  return (
    <Fragment>
          {loading ? <Loader/> : (<Fragment>
          <MetaData title={"Update Password"}/>
          <div className="UpdateContainer">
              <div className="UpdateBox">
                  <h2>Update Password</h2>
                  <form
                    className='updatePasswordForm'
                    encType='multipart/form-data'
                    onSubmit={updatePasswordSubmit}
                  >
                    
                    <div className="oldPassword">
                            <LockOpenIcon />
                            <input
                            type="password"
                            placeholder='Enter password...'
                            required
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                          />
                          </div>
                    
                          <div className="newPassword">
                            <LockIcon />
                            <input
                            type="password"
                            placeholder='Enter new password...'
                            required
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                          />
                          </div>
                          
                          <div className="confirmPassword">
                            <VpnKeyIcon />
                            <input
                            type="password"
                            placeholder='Enter confirm password...'
                            required
                            value={comfirmPassword}
                            onChange={e => setComfirmPassword(e.target.value)}
                          />
                        </div>
                <input
                    type="submit"
                    value="Change"
                    className='updateProfileBtn'
                />
                    </form>
              </div>
          </div>
    </Fragment>)}
      </Fragment>
  )
}

export default UpdatePassword