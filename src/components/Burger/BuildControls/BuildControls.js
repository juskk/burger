import React from 'react'
import BuildControl from './BuildControl/BuildControl'

import classes from './BuildControls.module.sass'


const BuildControls = (props) => {
    
    const controls = [
        {label: 'Meat', type: 'meat'},
        {label: 'Cheese', type: 'cheese'},
        {label: 'Bacon', type: 'bacon'},
        {label: 'Salad', type: 'salad'},


    ]

    return (
        <div className={classes.BuildControls}>
            <p>Current cost: <strong>{props.cost.toFixed(2)}</strong></p>
            {controls.map( (c,i) => {
                return <BuildControl  isDisabled = {props.disabled[c.type]}  remove = { () => props.removeIngredient(c.type) } add = { () => props.addIngredient(c.type)}  label={c.label} key = {c.type + i}/>
            } )}
            <button onClick={props.purchase}  disabled={!props.isPurchasable} className={classes.OrderButton}>{ props.isAuth ? "Order now" : "Sing up to order" }</button>

        </div>
    )
}

export default BuildControls
