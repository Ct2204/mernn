import React from 'react'
import './sideBar.css'
import logo from '../../images/logo.png'
import { Link } from 'react-router-dom'
import { TreeView, TreeItem } from '@material-ui/lab'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore.js'
import PostAddIcon from '@material-ui/icons/PostAdd.js'
import AddIcon from '@material-ui/icons/Add.js'
import ImportExportIcon from '@material-ui/icons/ImportExport.js'
import ListAltIcon from '@material-ui/icons/ListAlt.js'
import DashboardIcon from '@material-ui/icons/Dashboard.js'
import PeopleIcon from '@material-ui/icons/People.js'
import RateReviewIcon from '@material-ui/icons/RateReview.js'

const SideBar = () => {
  return (
      <div className='sideBar'>
          <Link to='/'>{<img src={logo} alt="Ecommere" />}</Link>
          <Link to='/admin/dashboard'>
              <p>
                <DashboardIcon/> Dashboard
              </p>
          </Link>
          <Link>
              <TreeView
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ImportExportIcon/>}
              >
                  <TreeItem nodeId='1' label='Products'>
                      <Link to='/admin/products'>
                          <TreeItem nodeId='2' label='All' icon={<PostAddIcon/> } />
                      </Link>

                      <Link to='/admin/product'>
                          <TreeItem nodeId='3' label='Create' icon={<AddIcon/> } />
                      </Link>
                      
                </TreeItem>
                  
            </TreeView>
          </Link>
          <Link to='/admin/orders'>
              <p><ListAltIcon/> Orders</p>
          </Link>
          <Link to='/admin/user'>
              <p><PeopleIcon/> Users</p>
          </Link>
          <Link to='/admin/review'>
              <p><RateReviewIcon /> Reviews</p>
          </Link>
         
    </div>
  )
}

export default SideBar