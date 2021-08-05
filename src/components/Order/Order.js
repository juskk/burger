import classes from './Order.module.sass'
import React from 'react'

const Order = (props) => {
    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName, amount: props.ingredients[ingredientName]
        })
    }
    const ing = ingredients.map( ig => {
        return <span key={ig.name}>{ig.name} ({ig.amount}); </span>
    } )

    return (
        <div className={classes.Order}>
            {ing}
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    )
}

export default Order
