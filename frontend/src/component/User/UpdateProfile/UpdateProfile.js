import React, { Fragment,useState,useEffect } from 'react'
import './UpdateProfile.css'
import Loader from '../../layout/Loader/Loader.js'
import { Link,useNavigate } from 'react-router-dom'

import MailOutlineIcon from '@material-ui/icons/MailOutline'
import FaceIcon from '@material-ui/icons/Face'
import { useDispatch, useSelector } from 'react-redux'
import {clearErrors,loadUser,updateProfile} from '../../../actions/userAction'
import {useAlert} from 'react-alert'
import profile from '../../../images/profile.png'
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstants.js'

const UpdateProfile = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const nevigate = useNavigate()

    const {user} = useSelector(state => state.user)
    const { error, loading, isUpdated} = useSelector(state => state.user)
    
    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [avatar, setAvatar] = useState()
    const [avatarPreview, setAvatarPriview] = useState("/profile.png")
    
    const updateProfileSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('name', name)
        myForm.set('email',email)
        myForm.set('avater', avatar)
        dispatch(updateProfile(myForm))
    }

    const updateProfileDataChane = (e) => {
        const reader = new FileReader()

            
        reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPriview(reader.result)
                    setAvatar(reader.result)
                }
            }
        
        reader.readAsDataURL(e.target.files[0])
    }


    useEffect(() => { 
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setAvatarPriview(user.avatar.url)
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success('Profile Updated Successfully')
            dispatch(loadUser())

            nevigate('/account')
            dispatch({
                type:UPDATE_PROFILE_RESET,
            })
        }
    },[dispatch,error,alert,isUpdated,user])

  return (
      <Fragment>
          <div className="UpdateContainer">
              <div className="UpdateBox">
                  <h2>Update Profile</h2>
              <form
                                className='signUpForm'
                              encType='multipart/form-data'
                              onSubmit={updateProfileSubmit}
                          >
                              <div className="signUpName">
                                  <FaceIcon />
                                  <input
                                    type="text"
                                      placeholder='Name'
                                      required
                                      name="name"
                                      value={name}
                                      onChange={updateProfileDataChane}
                                  />
                              </div>
        
                              <div className='signUpEmail'>
                                <MailOutlineIcon/>
                                  <input
                                    type="email"
                                      placeholder='Email'
                                      required
                                      name="email"
                                      value={email}
                                      onChange={updateProfileDataChane}
                                  />
                              </div>
        
                              <div id="updateProfileImage">
                                  <img src={profile} alt="Avater preview" />
                                  <input
                                      type='file'
                                      name='avatar'
                                      accept='image/*'
                                      onChange={updateProfileDataChane}
                                  />
                              </div>
                              <input
                                  type="submit"
                                  value="updateProfile"
                                  className='signUpBtn'
                                  
                              />
                              
                        </form>
              </div>
          </div>
    </Fragment>
  )
}

export default UpdateProfile