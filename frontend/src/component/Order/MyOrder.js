import React, { Fragment, useEffect } from 'react'
import './myOrder.css'

import {DataGrid} from "@material-ui/data-grid"
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors,myOrders } from '../../actions/orderAction.js'
import Loader from '../layout/Loader/Loader.js'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Typography } from '@mui/material'
import MetaData from '../layout/MetaData.js'
import LuanchIcon from '@material-ui/icons/Launch.js'


const MyOrder = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  
  const {loading,error,orders} = useSelector(state=>state.myOrders)
  const { user } = useSelector(state => state.user)
  
  
  console.log(orders,"My Order")
  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      minWidth: 300,
      flex:1,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 150,
      flex:0.5
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex:0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex:0.5,
    },
    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      type: 'Number',
      sortable:false,
    }
    
    
  ]
  const rows = []

  orders && orders.forEach((item,index) => {
    rows.push({
      itemsQty: item.ordersItems.length,
      id: item._id,
      status: item.orderStatus,
      amount:item.totalPrice,
    })
  });

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    dispatch(myOrders())
  },[dispatch,alert,error])

  return <Fragment>
    <MetaData title={`${user.name} - Orders`} />
    {loading ? (
      <Loader/>
    ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id='myOrdersHeading'>{user.name}'s Orders</Typography>

        </div>
    )
  }
  </Fragment>
 
  
}

export default MyOrder