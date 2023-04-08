import React, { Fragment } from 'react'
import {Typography,Stepper,StepLabel,Step} from '@material-ui/core'
import LocalShippingIcon from '@material-ui/icons/LocalShipping.js'
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck.js'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance.js'
import './CheckoutStep.css'
const CheckoutStep = ({activeStep}) => {
    const steps = [
        {
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingIcon/>
        },
        {
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckIcon/>
        },
        {
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceIcon/>
        },
    ]

    const stepStyles = {
        boxSizing: 'border-box',
    }
  
    return (
      <Fragment>
            <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
                {steps.map((item, index) => (
                    <Step
                        key={index}
                        active={activeStep === index ? true : false}
                        completed={activeStep >= index ? true : false}
                    >

                        <StepLabel
                            icon={item.icon}
                            style={{color: activeStep >=index ? "tomato" : "rgba(0,0,0,0.649)" }}
                        >
                            {item.label}
                        </StepLabel>
                    </Step>
                ))}
          </Stepper>
    </Fragment>
  )
}

export default CheckoutStep