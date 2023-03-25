import React, { Fragment, useState } from 'react'
import './Header.css'
import {SpeedDial,SpeedDialAction} from '@mui/material'
import profile from '../../../images/profile.png'
import Dashboard from '@material-ui/icons/Dashboard'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ListAltIcon from '@material-ui/icons/ListAlt'
import Backdrop from '@material-ui/core/Backdrop'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { useAlert } from 'react-alert'
import { logout } from '../../../actions/userAction.js'  


const UserOptions = ({user}) => {
  const nevigate = useNavigate()
  const dispatch = useDispatch()
  const alert = useAlert()



  const [open, setOpen] = useState(false)
  
  const options = [
    {icon: < ListAltIcon />, name:'Orders', func:orders},
    { icon:< PersonIcon />, name:'Profile', func:account},
   {icon: <ExitToAppIcon/>, name:'Logout', func:logoutUser},
    
  ]

  if (user.role === 'admin') {
    options.unshift({
      icon: <Dashboard />,
      name: 'Dashboard',
      func:dashboard,
    })
  }

  function dashboard() {
    nevigate('/dashboard')
  }
  function orders() {
    nevigate('/orders')
  }
  function account() {
    nevigate('/account')
  }
  function logoutUser() {
    dispatch(logout())
    alert.success('Logout successfully')
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{zIndex:'9'}} />
      <SpeedDial
        ariaLabel='SpeedDial tooltip example'
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        direction='down'
        style={{zIndex:'11'}}
        className='speedDial'
        icon={
          <img className='speedDialIcon' src={ profile}  alt='anh'/>
        }
      >
        {options.map((item) => (
          <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
        ))}
      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions