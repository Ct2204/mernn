import React, { Fragment,useRef,useState,useEffect } from 'react'
import './LoginSignUp.css'
import Loader from '../../layout/Loader/Loader.js'
import { AiOutlineMail } from 'react-icons/ai' 
import { HiOutlineLockOpen } from 'react-icons/hi'
import { MdOutlineFaceUnlock } from 'react-icons/md'
import profile from '../../../images/profile.png'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { useAlert } from 'react-alert'


import {useDispatch,useSelector } from 'react-redux'
import {clearErrors,login,register} from '../../../actions/userAction'

const LoginSignUp = () => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const nevigate = useNavigate()
    const location = useLocation()

    const {error,loading,isAuthenticated} = useSelector(state => state.user)

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null)

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword,setLoginPassword] = useState('')

    const [user, setUser] = useState({
        name: '',
        email: '',
        password:'',
    })

    const { name, email, password } = user
    
    const [avatar, setAvatar] = useState()
    
    const [avatarPreview,setAvatarPriview] = useState(profile)


    const loginSubmit = (e) => { 
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
       
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('name', name)
        myForm.set('email',email)
        myForm.set('password', password)
        myForm.set('avatar', avatar)
        dispatch(register(myForm))
    }

    const registerDataChane = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPriview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        } else {
            setUser({...user,[e.target.name]: e.target.value})
        }
    }

    const redirect = location.search ? location.search.split('=')[1] : '/account'

    useEffect(() => { 
        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (isAuthenticated) {
            nevigate(`${redirect}`)
        }
    },[dispatch,error,alert,isAuthenticated,nevigate,redirect])





    const switchTabs = (e,tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add('shiftToNeutral')
            switcherTab.current.classList.remove('shiftToRight')

            registerTab.current.classList.remove('shiftToNeutralForm')
            loginTab.current.classList.remove('shiftToLeft')
         
        }
        if (tab === "register") {
            switcherTab.current.classList.add('shiftToRight')
            switcherTab.current.classList.remove('shiftToNeutral')
           
            registerTab.current.classList.add('shiftToNeutralForm')
            loginTab.current.classList.add('shiftToLeft')
          
        }
    }
    

  return (
      <Fragment>
          {
              loading ? <Loader /> : (
                <Fragment>
                <div className="loginSignUp-container">
                      
                    <div className="loginSignUpBox">
                        <div>
                          <div className='login_signUp_toggle'>
                                  <p onClick={e => {
                                      
                                      switchTabs(e, "login")
                                  }}>LOGIN</p>
                                  <p onClick={e => {
                                      
                                      switchTabs(e, "register")
                                  }}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                        </div>
                        <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                            <div className="loginEmail">
                            <AiOutlineMail />
                            <input
                              type="email"
                              placeholder='Enter email...'
                              required
                              value={loginEmail}
                              onChange={e => setLoginEmail(e.target.value)}
                            />
                            </div>
                            <div className="loginPassword">
                            <HiOutlineLockOpen />
                            <input
                            type="password"
                            placeholder='Enter password...'
                            required
                            value={loginPassword}
                            onChange={e => setLoginPassword(e.target.value)}
                          />
                        </div>
                        <Link to="/password/forgot">Forget Password</Link>
                        <input type="submit" value="Login" className='loginBtn' />
                        </form>
                          
                        <form
                                className='signUpForm'
                              ref={registerTab}
                              encType='multipart/form-data'
                              onSubmit={registerSubmit}
                          >
                              <div className="signUpName">
                                  <MdOutlineFaceUnlock />
                                  <input
                                    type="text"
                                      placeholder='Name'
                                      required
                                      name="name"
                                      value={name}
                                      onChange={registerDataChane}
                                  />
                              </div>
        
                              <div className='signUpEmail'>
                                <AiOutlineMail/>
                                  <input
                                    type="email"
                                      placeholder='Email'
                                      required
                                      name="email"
                                      value={email}
                                      onChange={registerDataChane}
                                  />
                              </div>
                              <div className="signUpPassword">
                                  <HiOutlineLockOpen />
                                  <input
                                    type="password"
                                      placeholder='Password'
                                      required
                                      name="password"
                                      value={password}
                                      onChange={registerDataChane}
                                  />
                              </div>
        
                              <div id="registerImage">
                                  <img src={avatarPreview} alt="Avater preview" />
                                  <input
                                      type='file'
                                      name='avatar'
                                      accept='image/*'
                                      onChange={registerDataChane}
                                  />
                              </div>
                              <input
                                  type="submit"
                                  value="Register"
                                  className='signUpBtn'
                                  
                              />
                              
                        </form>
                          
                    </div> 
            </div>      
           </Fragment>
              )
          }
    </Fragment>
  )
}

export default LoginSignUp