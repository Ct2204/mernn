import React from 'react'
import SideBar from './SideBar'
import {Typography} from'@mui/material'
import './dashBoard.css'
import { Link } from 'react-router-dom'
import {Doughnut,Line} from 'react-chartjs-2'
import {useSelector } from 'react-redux'

const Dashboard = () => {
    
    const {products} = useSelector(state=>state.products)
    const {user} = useSelector(state=>state.user)
    const lineData = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197,72,49)"],
                data:[0,4000],
            }
        ]
       
    }

    const doughnutState = {
        labels: ['Out of stock', 'Instock'],
        datasets: [
            {
                backgroundColor: ['#00A6B4', '#6800B4'],
                hoverBackgroundColor: ['#4B5000', '#35014F'],
                data:[2,10],
            },
        ]
    }

  return (
      <div className='dashBoard'>
          <SideBar />
          
          <div className="dashBoard-container">
              <Typography component='h1'>Dashboard</Typography>
              <div className="dashboardSummary">
                  <div>
                     <p>Total Amount <br/>  2000VND</p> 
                  </div>
                  <div className="dashboardSummaryBox2">
                      <Link to='/admin/products'>
                          <p>Product</p>
                          <p>{products && products.length }</p>
                      </Link>
                      <Link to='/admin/orders'>
                          <p>Orders</p>
                          <p>4</p>
                      </Link>
                      <Link to='/admin/users'>
                          <p>Users</p>
                          {/* <p>{user && user.length }</p> */}
                          <p>2</p>
                      </Link>
                  </div>
                  
              </div>
              {/* <div className='lineChart'>
                  <Line data={lineData}/>
              </div> */}
              {/* <div className="doughnutChart">
                  <Doughnut data={doughnutState}/>
              </div> */}
          </div>
    </div>
  )
}

export default Dashboard