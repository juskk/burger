import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

import classes from './CheckoutSummary.module.sass'

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>hope it tastes well</h1>
            <h2>the burger:</h2>

            <Burger ingredients={props.ingredients}/>
            <Button 
            type="Danger"
            clicked={props.clickCanceled}>CANCEL</Button>
            <Button 
            type="Success"
            clicked={props.clickContinued}>CONTINUE</Button>
        </div>
    )
}
export default CheckoutSummary
